import type { NextPage } from 'next'
import UserTimeTable from '../components/AccessDataTable'
import TimeRecordTable from '../components/AccessTotalTable'
import DatabaseTable from '../components/DatabaseTable'
import ContactForm from '../components/Test'

const Admin: NextPage = () => {
  return (
    <>
      {/* <ContactForm /> */}
      {/* <DatabaseTable /> */}
      <UserTimeTable />
      <TimeRecordTable />
    </>
  )
}
export default Admin
