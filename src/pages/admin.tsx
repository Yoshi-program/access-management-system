import type { NextPage } from 'next'
import DisplayList from '../components/DataDisplayTable'
import { Contact } from '../components/FallDataForm'

const Admin: NextPage = () => {
  return (
    <>
      <p>admin page</p>
      <DisplayList />
      <Contact />
    </>
  )
}
export default Admin
