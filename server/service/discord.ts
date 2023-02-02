import type { GuildMember, TextChannel, Message } from 'discord.js'
import { Client } from 'discord.js'
import dotenv from 'dotenv'
import type { FastifyRequest, FastifyReply } from 'fastify'

dotenv.config()

const handler = async (req: FastifyRequest, reply: FastifyReply) => {
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
    if (message.content.startsWith('!ping')) {
      message.channel.send('Pong!')
    }
  })

  client.login(process.env.DiscordBotTOKEN)

  switch (req.method) {
    case 'POST': {
      reply.status(statusCode).send({})
      // reply.status(statusCode).json({ qrcode: req.body.qrcode })
      break
    }
    default: {
      // res.status(statusCode).json({ name: 'John Doe' })
      break
    }
  }
}

export default handler
