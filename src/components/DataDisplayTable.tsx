import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core'
import { useEffect, useState } from 'react'

type Props = {
  id: number
  organizationId: string
  organizationName: string
  discordId: string
}

const DisplayList: React.FC = () => {
  const [list, setList] = useState<Props[]>()

  useEffect(() => {
    fetch(`http://localhost:8081/testGet`)
      .then((response) => response.body)
      .then((rb) => {
        if (rb === null) return
        const reader = rb.getReader()

        return new ReadableStream({
          start(controller) {
            function push() {
              reader.read().then(({ done, value }) => {
                if (done) {
                  controller.close()
                  return
                }
                controller.enqueue(value)
                push()
              })
            }
            push()
          },
        })
      })
      .then((stream) => new Response(stream, { headers: { 'Content-Type': 'text/html' } }).text())
      .then((result) => {
        console.log(result)
        setList(JSON.parse(result).data)
      })
  }, [])

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>組織id</TableCell>
              <TableCell align="right">組織名</TableCell>
              <TableCell align="right">組織DiscordID</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list ? (
              list.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.organizationId}</TableCell>
                  <TableCell align="right">{row.organizationName}</TableCell>
                  <TableCell align="right">{row.discordId}</TableCell>
                </TableRow>
              ))
            ) : (
              <></>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
export default DisplayList
