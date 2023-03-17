import styled from 'styled-components'
import { useRouter } from 'next/router'

const Btn = styled.button``

const AdminRouter = () => {
  const router = useRouter()

  const handleClick = () => {
    router.push('/admin')
  }

  return <Btn onClick={handleClick}>Admin</Btn>
}
export default AdminRouter
