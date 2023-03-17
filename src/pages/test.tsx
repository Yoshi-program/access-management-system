import type { NextPage } from 'next'
import { Container, Typography } from '@material-ui/core'
import UserDataTable from '../components/UserDataTable'
import TotalTimeTable from '../components/TotalTimeTable'
import type { DataHeader, UserData, UserTotalTime } from '../types/dataTypes'
import { calculateTotalTime } from '../utils/calculateTotalTime'
import { useEffect, useState } from 'react'
import { demoData } from '../demoData'

const headers: DataHeader[] = [
  { id: 'id', label: 'ID' },
  { id: 'name', label: 'Name' },
  { id: 'date', label: 'Date' },
  { id: 'location', label: 'Location' },
  { id: 'action', label: 'Action' },
]

const Admin: NextPage = () => {
  const [userData, setUserData] = useState<UserData[]>(demoData)
  const [totalTimeData, setTotalTimeData] = useState<UserTotalTime[]>([])

  useEffect(() => {
    setTotalTimeData(calculateTotalTime(userData))
    // async function fetchData() {
    //   try {
    //     const response = await fetch('http://localhost:8081')
    //     const jsonData = await response.json()
    //     setUserData(jsonData)
    //     setTotalTimeData(calculateTotalTime(jsonData))
    //   } catch (error) {
    //     console.error('Error fetching data:', error)
    //   }
    // }
    // fetchData()
  }, [userData])

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        User Data
      </Typography>
      <UserDataTable headers={headers} />
      <Typography variant="h4" gutterBottom>
        Total Time
      </Typography>
      <TotalTimeTable data={totalTimeData} />
    </Container>
  )
}

export default Admin
