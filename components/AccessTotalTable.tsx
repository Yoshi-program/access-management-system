import React, { useEffect, useState } from 'react'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core'

interface Log {
  id: number
  name: string
  date: string
  time: string
  location: string
  type: 'in' | 'out'
}

interface UserTime {
  name: string
  totalTime: number
}

const headers = [
  { id: 'name', label: 'Name' },
  { id: 'date', label: 'Date' },
  { id: 'time', label: 'Time' },
  { id: 'location', label: 'Location' },
  { id: 'type', label: 'Type' },
]

const demoData: Log[] = [
  {
    id: 1,
    name: 'John Doe',
    date: '2023-03-13',
    time: '08:30',
    location: 'Office',
    type: 'in',
  },
  {
    id: 2,
    name: 'John Doe',
    date: '2023-03-13',
    time: '17:30',
    location: 'Office',
    type: 'out',
  },
  {
    id: 3,
    name: 'Jane Smith',
    date: '2023-03-13',
    time: '09:00',
    location: 'Office',
    type: 'in',
  },
  {
    id: 4,
    name: 'Jane Smith',
    date: '2023-03-13',
    time: '18:00',
    location: 'Office',
    type: 'out',
  },
  {
    id: 5,
    name: 'John Doe',
    date: '2023-03-14',
    time: '08:00',
    location: 'Office',
    type: 'in',
  },
  {
    id: 6,
    name: 'John Doe',
    date: '2023-03-14',
    time: '17:00',
    location: 'Office',
    type: 'out',
  },
  {
    id: 7,
    name: 'Jane Smith',
    date: '2023-03-14',
    time: '08:30',
    location: 'Office',
    type: 'in',
  },
  {
    id: 8,
    name: 'Jane Smith',
    date: '2023-03-14',
    time: '17:30',
    location: 'Office',
    type: 'out',
  },
]

const TimeRecordTable = () => {
  const [logs, setLogs] = useState<Log[]>(demoData)
  const [userTimes, setUserTimes] = useState<UserTime[]>([])

  // useEffect(() => {
  //   const fetchLogs = async () => {
  //     const response = await fetch('http://localhost:8081')
  //     const data = await response.json()
  //     setLogs(data)
  //   }
  //   fetchLogs()
  // }, [])

  useEffect(() => {
    const calcUserTimes = () => {
      const userMap: Map<string, number> = new Map()
      logs.forEach((log) => {
        if (log.type === 'in') {
          const nextLog = logs.find(
            (l) => l.name === log.name && l.type === 'out' && l.date === log.date
          )
          if (nextLog) {
            const totalTime =
              (new Date(`${nextLog.date}T${nextLog.time}`).getTime() -
                new Date(`${log.date}T${log.time}`).getTime()) /
              (1000 * 60)
            const totalTimeForUser = userMap.get(log.name) || 0
            userMap.set(log.name, totalTimeForUser + totalTime)
          }
        }
      })
      const userTimesArray: UserTime[] = []
      userMap.forEach((value, key) => {
        userTimesArray.push({ name: key, totalTime: value })
      })
      setUserTimes(userTimesArray)
    }
    calcUserTimes()
  }, [logs])

  return (
    <div>
      <h1>Time Log</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <TableCell key={header.id}>{header.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {logs.map((log) => (
              <TableRow key={log.id}>
                <TableCell>{log.name}</TableCell>
                <TableCell>{log.date}</TableCell>
                <TableCell>{log.time}</TableCell>
                <TableCell>{log.location}</TableCell>
                <TableCell>{log.type}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <h1>User Times</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Total Time (minutes)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userTimes.map((userTime) => (
              <TableRow key={userTime.name}>
                <TableCell>{userTime.name}</TableCell>
                <TableCell>{userTime.totalTime}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default TimeRecordTable
