import type { GuildMember, Message, TextChannel } from 'discord.js'
import { Client } from 'discord.js'
import type { NextApiRequest, NextApiResponse } from 'next'
import { CHANNEL_ID, TOKEN } from '../../components/token'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const statusCode = 200
  console.log(req.body)
  const client = new Client({
    intents: ['Guilds', 'GuildMembers', 'GuildMessages'],
  })

  client.once('ready', () => {
    console.log('Ready!')
    console.log(client.user?.tag)
  })

  client.on('ready', async () => {
    // const channel = (await client.channels.cache.get(CHANNEL_ID)) as TextChannel
    // channel.send('what you want to send to that channel')
  })

  client.on('guildMemberAdd', (member: GuildMember) => {
    const TargetChannel = member.guild.channels.cache.get(CHANNEL_ID) as TextChannel
    TargetChannel.send('Test Log!')
  })

  client.on('messageCreate', async (message: Message) => {
    if (message.author.bot) return
    // if (message.content.startsWith('!ping')) {
    //   message.channel.send('Pong!')
    // }
    message.channel.send('in')
  })
  client.login(TOKEN)
  switch (req.method) {
    case 'POST': {
      res.status(statusCode).json({ qrcode: req.body.qrcode })
      break
    }
    default: {
      res.status(statusCode).json({ name: 'John Doe' })
      break
    }
  }
}

export default handler
