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
// import { headers } from './headers'

const headers = [
  { id: 'id', label: 'ID' },
  { id: 'name', label: 'Name' },
  { id: 'age', label: 'Age' },
  { id: 'email', label: 'Email' },
]

const databaseRecords1: DatabaseRecord[] = [
  { id: 1, name: 'John Smith', age: 25, email: 'john.smith@example.com' },
  { id: 2, name: 'Jane Doe', age: 32, email: 'jane.doe@example.com' },
  { id: 3, name: 'Bob Johnson', age: 47, email: 'bob.johnson@example.com' },
  { id: 4, name: 'Alice Brown', age: 18, email: 'alice.brown@example.com' },
  { id: 5, name: 'Mike Williams', age: 56, email: 'mike.williams@example.com' },
]

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      minWidth: 650,
    },
  })
)

interface DatabaseRecord {
  id: number
  name: string
  age: number
  email: string
}

function DatabaseTable() {
  const classes = useStyles()
  const [databaseRecords, setDatabaseRecords] = useState<DatabaseRecord[]>([])

  useEffect(() => {
    // const fetchData = async () => {
    //   const response = await fetch('http://localhost:8081')
    //   const data = await response.json()
    //   setDatabaseRecords(data)
    // }

    // fetchData()
    setDatabaseRecords(databaseRecords1)
  }, [])

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="Database table">
        <TableHead>
          <TableRow>
            {headers.map((header) => (
              <TableCell key={header.id}>{header.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {databaseRecords.map((record) => (
            <TableRow key={record.id}>
              <TableCell>{record.id}</TableCell>
              <TableCell>{record.name}</TableCell>
              <TableCell>{record.age}</TableCell>
              <TableCell>{record.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default DatabaseTable
