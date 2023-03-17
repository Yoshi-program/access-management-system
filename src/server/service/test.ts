import type { FastifyReply, FastifyRequest } from 'fastify'
import prisma from '../lib/prisma'
import * as z from 'zod'

const requestBodySchema = z.object({
  organizationId: z.string().min(1),
  organizationName: z.string(),
  discordId: z.string(),
})

const testPost = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const result = requestBodySchema.parse(req.body)
    await prisma.organization.create({
      data: {
        organizationId: result.organizationId,
        organizationName: result.organizationName,
        discordId: result.discordId,
      },
    })
    reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ hello: 'world' })
    return
  } catch (error) {
    reply.send(error)
  }
}

export const testGet = async (req: FastifyRequest, reply: FastifyReply) => {
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
}

export default testPost
