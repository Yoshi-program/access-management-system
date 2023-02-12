import fastify from 'fastify'
import type { IBodystring } from '../types/access'
import type registerContent from '../types/register'
import checkAccess from './access'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const server = fastify()

server.post<{ Body: string }>('/access', async (req, reply) => {
  console.log('access request.body: ', req.body)
  const accessData: IBodystring = JSON.parse(req.body)
  checkAccess(accessData)
  return req.body
})

server.post<{ Body: string }>('/register', async (req, reply) => {
  console.log('request.body: ', req.body)
  const registerContent: registerContent = JSON.parse(req.body)
  const user = await prisma.user.create({
    data: {
      name: registerContent.name,
      userId: registerContent.userId,
      studentId: registerContent.studentId,
      discordId: registerContent.discordId,
      token: registerContent.token,
      floor: registerContent.floor,
    },
  })
  console.log(user)
  return req.body
})

server.listen({ port: 8081 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
