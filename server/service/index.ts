import fastify from 'fastify'
import type { GuildMember, TextChannel, Message } from 'discord.js'
import { Client } from 'discord.js'
import dotenv from 'dotenv'
import type IBodystring from '../types/access'
// import checkAccess from './access'
// import handler from './discord'

const qrCodeText: string = JSON.stringify({
  version: '1.0.0',
  appId: '1',
  token: 'snfjvkdcsifa',
})

dotenv.config()

const statusCode = 200
const client = new Client({
  intents: ['Guilds', 'GuildMembers', 'GuildMessages'],
})

client.once('ready', () => {
  console.log('Ready!')
  console.log(client.user?.tag)
})

client.on('messageCreate', async (message: Message) => {
  if (message.author.bot) return
  message.channel.send('Pongggg!')
  if (message.content.startsWith('!ping')) {
    message.channel.send('Pong!')
  }
})

client.login(process.env.DiscordBotTOKEN)

const server = fastify()

server.post<{ Body: IBodystring }>('/access', async (req, reply) => {
  console.log('request.body: ', req.body)
  return req.body
})

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
