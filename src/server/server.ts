import fastify from 'fastify'
import cors from '@fastify/cors'
import crypto from 'crypto'
import type { IBodystring } from './types/access'
import checkAccess from './access'
import { bot } from './register'
import { PrismaClient } from '@prisma/client'
import type { RouteGenericInterface } from 'fastify'

const prisma = new PrismaClient()

interface MyRouteGeneric extends RouteGenericInterface {
  Params: {
    model: 'users' | 'organizations'
    id: string
  }
  Body: string
}

const server = fastify({ logger: true })

server.register(cors)

server.post<{ Body: IBodystring }>('/access', async (req, reply) => {
  try {
    const accessData: IBodystring = req.body
    const success = await checkAccess(accessData)
    reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ success: success })
  } catch (error) {
    reply.send(error)
  }
})

server.get('/', async (req, reply) => {
  reply.send('Hello World!')
})

server.get<MyRouteGeneric>('/api/:model/get', async (request, reply) => {
  const { model } = request.params
  const data = await getModelData(model)
  reply.send({ data })
})

server.post<MyRouteGeneric>('/api/:model/add', async (request, reply) => {
  const { model } = request.params
  const addData = request.body
  const data = await addModelData(model, JSON.stringify(addData))
  reply.send({ data })
})

server.put<MyRouteGeneric>('/api/:model/edit/:id', async (request, reply) => {
  const { model, id } = request.params
  const editData = request.body
  const data = await editModelData(model, JSON.stringify(editData), id)
  reply.send({ data })
})

server.delete<MyRouteGeneric>('/api/:model/delete/:id', async (request, reply) => {
  const { model, id } = request.params
  const data = await deleteModelData(model, id)
  reply.send({ data })
})

async function getModelData(model: 'users' | 'organizations') {
  switch (model) {
    case 'users':
      return await prisma.user.findMany()
    case 'organizations':
      return await prisma.organization.findMany()
    default:
      throw new Error(`Unknown model: ${model}`)
  }
}

// 型を後に修正
async function addModelData(model: 'users' | 'organizations', data: string) {
  const parsedData = JSON.parse(data)
  if (model === 'organizations') {
    parsedData['organizationId'] = crypto.randomUUID()
  }
  switch (model) {
    case 'users':
      return await prisma.user.create({ data: parsedData })
    case 'organizations':
      return await prisma.organization.create({ data: parsedData })
    default:
      throw new Error(`Unknown model: ${model}`)
  }
}

async function editModelData(model: 'users' | 'organizations', data: string, id: string) {
  switch (model) {
    case 'users':
      return await prisma.user.update({ where: { id: Number(id) }, data: JSON.parse(data) })
    case 'organizations':
      return await prisma.organization.update({ where: { id: Number(id) }, data: JSON.parse(data) })
    default:
      throw new Error(`Unknown model: ${model}`)
  }
}

async function deleteModelData(model: 'users' | 'organizations', id: string) {
  switch (model) {
    case 'users':
      return await prisma.user.delete({ where: { id: Number(id) } })
    case 'organizations':
      return await prisma.organization.delete({ where: { id: Number(id) } })
    default:
      throw new Error(`Unknown model: ${model}`)
  }
}

server.listen({ port: 8081 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
  bot()
})
