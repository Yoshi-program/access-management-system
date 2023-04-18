import { useEffect, useState } from 'react'
import axios from 'axios'
import useUserRole from '../../hooks/useUserRole'
import { useRouter } from 'next/router'
import { useAuth } from '../../context/AuthContext'
import type { NextPage } from 'next'
import UserTable from '../../components/UserTable'

const Users: NextPage = () => {
  // const [users, setUsers] = useState([])
  const router = useRouter()
  const { user } = useAuth()
  const userRoleInfo = useUserRole()

  useEffect(() => {
    const fetchData = async () => {
      if (userRoleInfo.organization !== null) {
        if (!user) {
          router.push('/admin')
        } else if (
          userRoleInfo &&
          (userRoleInfo.organization !== 'TestOrganization' || userRoleInfo.subRole !== 'senior')
        ) {
          // console.log(userRoleInfo.organization)
          alert('You do not have access to this page.')
          router.push('/admin')
        }
      }
    }
    fetchData()
  }, [user, userRoleInfo, router])

  // useEffect(() => {
  //   // const fetchData = async () => {
  //   //   try {
  //   //     const response = await axios.get('/api/users')
  //   //     setUsers(response.data)
  //   //   } catch (error) {
  //   //     console.error(error)
  //   //   }
  //   // }

  //   // fetchData()
  //   console.log(userRoleInfo.organization)
  // }, [userRoleInfo])

  return (
    <div>
      <h1>Users</h1>
      {/* Render users data */}
      <UserTable />
    </div>
  )
}

export default Users
