import type { GuildMember, TextChannel } from 'discord.js'
import { Client } from 'discord.js'
import dotenv from 'dotenv'
import type { NextApiRequest, NextApiResponse } from 'next'

dotenv.config()

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
    if (req.body.qrcode != '') {
      if (process.env.CHANNEL_ID) {
        const channel = (await client.channels.cache.get(process.env.CHANNEL_ID)) as TextChannel
        channel.send('in')
      }
    }
  })

  client.on('guildMemberAdd', (member: GuildMember) => {
    if (process.env.CHANNEL_ID) {
      const TargetChannel = member.guild.channels.cache.get(process.env.CHANNEL_ID) as TextChannel
      TargetChannel.send('Test Log!')
    }
  })

  client.login(process.env.TOKEN)

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
