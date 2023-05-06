import { useState, useEffect, useContext } from 'react'
import { doc, onSnapshot, collection } from 'firebase/firestore'
import { AuthContext } from '../context/AuthContext'
import { db } from '../../firebase'

interface UserRoleInfo {
  role: string | null
  organization: string | null
  subRole: string | null
}

const useUserRole = () => {
  const { user } = useContext(AuthContext)
  const [userRoleInfo, setUserRoleInfo] = useState<UserRoleInfo>({
    role: null,
    organization: null,
    subRole: null,
  })

  useEffect(() => {
    if (!user) {
      setUserRoleInfo({ role: null, organization: null, subRole: null })
      return
    }

    const userDocRef = doc(collection(db, 'users'), user.uid)

    const unsubscribe = onSnapshot(userDocRef, (docSnapshot) => {
      const data = docSnapshot.data()
      setUserRoleInfo({
        role: data?.role || null,
        organization: data?.organization || null,
        subRole: data?.subRole || null,
      })
    })

    return () => {
      unsubscribe()
    }
  }, [user])

  return userRoleInfo
}

export default useUserRole
