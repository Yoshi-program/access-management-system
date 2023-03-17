import React, { useEffect, useState } from 'react'
import type { DataHeader, UserData } from '../types/dataTypes'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core'
import { demoData } from '../demoData'

interface UserDataTableProps {
  headers: DataHeader[]
}

const UserDataTable: React.FC<UserDataTableProps> = ({ headers }) => {
  const [data, setData] = useState<UserData[]>(demoData)

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const response = await fetch('http://localhost:8081')
  //       const jsonData = await response.json()
  //       setData(jsonData)
  //     } catch (error) {
  //       console.error('Error fetching data:', error)
  //     }
  //   }
  //   fetchData()
  // }, [])

  return (
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
          {data.map((row: UserData) => (
            <TableRow key={row.id}>
              {headers.map((header) => (
                <TableCell key={header.id}>{row[header.id]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default UserDataTable
