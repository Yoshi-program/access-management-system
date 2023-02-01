import fastify from 'fastify'
import type IBodystring from '../types/access'
import checkAccess from './access'
// import handler from './discord'

const server = fastify()

server.get<{ Body: IBodystring }>('/access', async (req, reply) => {
  checkAccess(req.body)
  return 'access!!\n'
})

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
