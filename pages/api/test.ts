// import type { GuildMember, TextChannel } from 'discord.js'
// import { Client } from 'discord.js'
// import dotenv from 'dotenv'
import type { NextApiRequest, NextApiResponse } from 'next'

// dotenv.config()

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const statusCode = 200
  res.status(statusCode).json({ name: 'John Doe' })
  // const client = new Client({
  //   intents: ['Guilds', 'GuildMembers', 'GuildMessages'],
  // })

  // client.once('ready', () => {
  //   console.log('Ready!')
  //   console.log(client.user?.tag)
  // })

  // client.on('ready', async () => {
  //   if (req.body.qrcode != '') {
  //     if (process.env.CHANNEL_ID) {
  //       const channel = (await client.channels.cache.get(process.env.CHANNEL_ID)) as TextChannel
  //       channel.send('in')
  //     }
  //   }
  // })

  // client.on('guildMemberAdd', (member: GuildMember) => {
  //   // memberのIDを取得
  //   // QRコードの作成
  //   // 個人QRコードが載っているサイトへのURLを個人DMに送信
  //   // PWAの説明nのためのサイトのURLを個人DMに送信
  // })

  // client.login(process.env.TOKEN)

  // switch (req.method) {
  //   case 'POST': {
  //     res.status(statusCode).json({ qrcode: req.body.qrcode })
  //     break
  //   }
  //   default: {
  //     res.status(statusCode).json({ name: 'John Doe' })
  //     break
  //   }
  // }
}

export default handler
