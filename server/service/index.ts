import fastify from 'fastify'
import type { GuildMember, TextChannel, Message } from 'discord.js'
import { Client } from 'discord.js'
import dotenv from 'dotenv'
import crypto from 'crypto'
import type { IBodystring } from '../types/access'
import type registerContent from '../types/register'
import checkAccess from './access'
// import handler from './discord'
import { PrismaClient } from '@prisma/client'

dotenv.config()

const prisma = new PrismaClient()

const qrCodeText: string = JSON.stringify({
  version: '1.0.0',
  appId: '1',
  token: 'snfjvkdcsifa',
})

const register = async (content: registerContent) => {
  const createdToken = crypto.randomUUID()
  const user = await prisma.user.create({
    data: {
      name: content.name,
      userId: crypto.randomUUID(),
      studentId: content.studentId,
      discordId: content.discordId,
      token: createdToken,
      floor: content.floor,
    },
  })
  console.log(user)
  return createdToken
}

const statusCode = 200
const client = new Client({
  intents: ['Guilds', 'GuildMembers', 'GuildMessages', 'MessageContent'],
})

client.once('ready', () => {
  console.log('Ready!')
  console.log(client.user?.tag)
})

client.on('messageCreate', async (message: Message) => {
  if (message.author.bot) return
  console.log(message.author)
  if (message.content.includes('name')) {
    const content: registerContent = JSON.parse(message.content)
    content.discordId = message.author.id
    content.name = message.author.username //  + message.author.discriminator
    await register(content).then((token) => {
      console.log('登録できた')
      const user = client.users.cache.get(`${message.author.id}`)
      if (user) {
        const sendText = `https://localhost:3000/?token=${token}` // PWAの導入に関する文章（参考URLを入れて）も加える
        user.send(sendText)
      }
    })
  }
})
// '{"studentId": "111112", "floor": "24"}'

client.login(process.env.DiscordBotTOKEN)

const server = fastify()

server.post<{ Body: IBodystring }>('/access', async (req, reply) => {
  console.log('request.body: ', req.body)
  checkAccess(req.body)
  return req.body
})

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
