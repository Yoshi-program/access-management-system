import { createContext, useContext, useEffect, useState } from 'react'
import { auth, db } from '../../firebase'
import type { User } from 'firebase/auth'
import type { UserCredential } from 'firebase/auth'
import { createUserWithEmailAndPassword } from '@firebase/auth'
import { doc, setDoc } from '@firebase/firestore'
import { signInWithEmailAndPassword } from 'firebase/auth'

interface AuthContextValue {
  user: User | null
  signUp: (email: string, password: string, organization: string) => Promise<UserCredential>
  signIn: (email: string, password: string) => Promise<UserCredential>
  signOut: () => Promise<void>
}

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthContext = createContext<AuthContextValue>({
  user: null,
  signUp: async (
    email: string,
    password: string,
    organization: string
  ): Promise<UserCredential> => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user
      if (user) {
        await setDoc(doc(db, 'users', user.uid), {
          role: 'member',
          organization: organization,
          subRole: 'junior',
        })
      }
      return userCredential
    } catch (error) {
      console.error('Error in signUp:', error)
      throw error
    }
  },
  signIn: async (email: string, password: string): Promise<UserCredential> => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      return userCredential
    } catch (error) {
      console.error('Error in signIn:', error)
      throw error
    }
  },
  signOut: () => {
    return auth.signOut()
  },
})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user)
    })

    return () => unsubscribe()
  }, [])

  const signUp = async (
    email: string,
    password: string,
    organization: string
  ): Promise<UserCredential> => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user
      if (user) {
        await setDoc(doc(db, 'users', user.uid), {
          role: 'member',
          organization: organization,
          subRole: 'junior',
        })
      }
      return userCredential
    } catch (error) {
      console.error('Error in signUp:', error)
      throw error
    }
  }

  const signIn = async (email: string, password: string): Promise<UserCredential> => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      return userCredential
    } catch (error) {
      console.error('Error in signIn:', error)
      throw error
    }
  }

  const signOut = () => {
    return auth.signOut()
  }

  const value: AuthContextValue = {
    user,
    signUp,
    signIn,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
