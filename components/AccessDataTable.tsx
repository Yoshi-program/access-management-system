import React, { useState, useEffect } from 'react'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
// import { headers } from './headers';

interface Header {
  id: string
  label: string
}

const headers: Header[] = [
  { id: 'name', label: 'Name' },
  { id: 'date', label: 'Date' },
  { id: 'inTime', label: 'In Time' },
  { id: 'outTime', label: 'Out Time' },
  { id: 'totalHours', label: 'Total Hours' },
]

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      minWidth: 650,
    },
    total: {
      fontWeight: 'bold',
    },
  })
)

interface TimeRecord {
  id: number
  name: string
  date: string
  time: string
  location: string
  type: 'in' | 'out'
}

const demoData: TimeRecord[] = [
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

function UserTimeTable() {
  const classes = useStyles()
  const [timeRecords, setTimeRecords] = useState<TimeRecord[]>(demoData)

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch('http://localhost:8081')
  //     const data = await response.json()
  //     setTimeRecords(data)
  //   }

  //   fetchData()
  // }, [])

  const calculateTotalDifference = (name: string) => {
    let totalDifference = 0
    let currentRecord: TimeRecord | null = null

    for (const record of timeRecords) {
      if (record.name === name && record.type === 'in') {
        currentRecord = record
      } else if (record.name === name && record.type === 'out') {
        if (currentRecord) {
          const difference =
            Date.parse(`${record.date} ${record.time}`) -
            Date.parse(`${currentRecord.date} ${currentRecord.time}`)
          totalDifference += difference
        }
        currentRecord = null
      }
    }

    return totalDifference / 1000 / 60
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="User time table">
        <TableHead>
          <TableRow>
            {headers.map((header) => (
              <TableCell key={header.id}>{header.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {timeRecords.map((record, index) => (
            <TableRow key={record.id}>
              <TableCell>{record.name}</TableCell>
              <TableCell>{record.date}</TableCell>
              <TableCell>{record.time}</TableCell>
              <TableCell>{record.location}</TableCell>
              <TableCell>{record.type}</TableCell>
              {index % 2 === 1 && (
                <TableCell className={classes.total}>
                  {calculateTotalDifference(record.name).toFixed(2)} minutes
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default UserTimeTable
