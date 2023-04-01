import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../context/AuthContext'
import useUserRole from '../hooks/useUserRole'

const ProgrammingSenior: React.FC = () => {
  const router = useRouter()
  const { user } = useAuth()
  const userRoleInfo = useUserRole()

  useEffect(() => {
    if (!user) {
      router.push('/sign-in')
    } else if (
      userRoleInfo &&
      (userRoleInfo.organization !== 'programming' || userRoleInfo.subRole !== 'senior')
    ) {
      alert('You do not have access to this page.')
      router.push('/')
    }
  }, [user, userRoleInfo, router])

  return (
    <div>
      <h1>Programming Senior Page</h1>
      <p>このページはプログラミングサークルの上位権限者向けです。</p>
    </div>
  )
}

export default ProgrammingSenior
