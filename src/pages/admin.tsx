import type { NextPage } from 'next'
import { useState, useContext, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import useUserRole from '../hooks/useUserRole'
import { useRouter } from 'next/router'

const Admin: NextPage = () => {
  const { user, signUp, signIn, signOut } = useAuth()
  const userRoleInfo = useUserRole()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [organization, setOrganization] = useState('')
  const [role, setRole] = useState('')

  const router = useRouter()

  useEffect(() => {
    if (user) {
      // ユーザーが正常にサインインしたら、遷移先ページにリダイレクトする
      // router.push('/dashboard')
    }
  }, [user, router])

  // const handleSignUp = async () => {
  //   try {
  //     await signUp(email, password, organization, role)
  //     alert('Successfully signed up.')
  //   } catch (error: any) {
  //     alert(`Error: ${error.message}`)
  //   }
  // }
  const handleSignUp = async () => {
    try {
      const email = 'test4@example.com'
      const password = 'test4password'
      const organization = 'TestOrganization'
      await signUp(email, password, organization)
      console.log('User signed up successfully')
    } catch (error) {
      console.error('Error in handleSignUp:', error)
    }
  }

  const handleSignIn = async () => {
    try {
      await signIn(email, password)
      alert('Successfully signed in.')
      console.log(userRoleInfo)
    } catch (error: any) {
      alert(`Error: ${error.message}`)
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut()
      alert('Successfully signed out.')
    } catch (error: any) {
      alert(`Error: ${error.message}`)
    }
  }

  return (
    <div>
      <h1>Admin Page</h1>
      {user ? (
        <>
          <h2>Welcome, {user.email}!</h2>
          {userRoleInfo && (
            <p>
              You are a {userRoleInfo.role} in {userRoleInfo.organization}.
            </p>
          )}
          <button onClick={handleSignOut}>Sign Out</button>
        </>
      ) : (
        <>
          <h2>Sign Up</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="text"
            placeholder="Organization"
            value={organization}
            onChange={(e) => setOrganization(e.target.value)}
          />
          <input
            type="text"
            placeholder="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
          <button onClick={handleSignUp}>Sign Up</button>

          <h2>Sign In</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleSignIn}>Sign In</button>
        </>
      )}
    </div>
  )
}

export default Admin

// import type { NextPage } from 'next'
// import DisplayList from '../components/DataDisplayTable'
// import { Contact } from '../components/FallDataForm'

// const Admin: NextPage = () => {
//   return (
//     <>
//       <p>admin page</p>
//       <DisplayList />
//       <Contact />
//     </>
//   )
// }
// export default Admin
