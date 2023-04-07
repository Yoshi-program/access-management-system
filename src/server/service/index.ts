import fastify from 'fastify'
import cors from '@fastify/cors'
import prisma from '../lib/prisma'
import type { IBodystring } from '../types/access'
// import type registerContent from '../types/register'
import checkAccess from './access'
import testPost, { testGet } from './test'
import { bot } from './register'
// import { PrismaClient } from '@prisma/client'

// const prisma = new PrismaClient()

const server = fastify({ logger: true })

server.register(cors)

server.post<{ Body: string }>('/access', async (req, reply) => {
  console.log('access request.body: ', req.body)
  const accessData: IBodystring = JSON.parse(JSON.stringify(req.body))
  checkAccess(accessData)
  return req.body
})

server.get('/', async (req, reply) => {
  reply.send('Hello World!')
})

server.post('/testPost', async (req, reply) => {
  testPost(req, reply)
})

server.get('/testGet', async (req, reply) => {
  // testGet(req, reply)
  try {
    // const result = requestBodySchema.parse(req.body)
    const organizationData = await prisma.organization.findMany()
    console.log(organizationData)
    reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: organizationData })
  } catch (error) {
    reply.send(error)
  }
})

// server.post<{ Body: string }>('/register', async (req, reply) => {
//   console.log('request.body: ', req.body)
//   const registerContent: registerContent = JSON.parse(req.body)
//   const user = await prisma.user.create({
//     data: {
//       name: registerContent.name,
//       userId: registerContent.userId,
//       studentId: registerContent.studentId,
//       discordId: registerContent.discordId,
//       token: registerContent.token,
//       floor: registerContent.floor,
//     },
//   })
//   console.log(user)
//   return req.body
// })

server.listen({ port: 8081 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
  bot()
})
