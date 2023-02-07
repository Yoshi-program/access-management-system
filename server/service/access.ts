import type { IBodystring, AccessContent } from '../types/access'
import { PrismaClient } from '@prisma/client'
import { Client } from 'discord.js'
import type { TextChannel } from 'discord.js'

const prisma = new PrismaClient()

const currentVersion = '1.0.0'
const currentAppId = '1'

// const postAccess = async (content: AccessContent) => {
//   const access = await prisma.post.create({
//     data: {
//       userId: content.userId,
//       floorId: content.floorId,
//       access: content.access,
//     },
//   })
//   console.log(access)
// }

const main = async (token: string, access: string, floorId: number) => {
  const users = await prisma.user.findMany()
  users.map(async (user) => {
    if (user.token === token) {
      const client = new Client({
        intents: ['Guilds', 'GuildMembers', 'GuildMessages'],
      })

      // client.once('ready', () => {
      //   console.log('Ready Access!')
      //   console.log(client.user?.tag)
      // })

      client.on('ready', async () => {
        if (process.env.CHANNEL_ID) {
          const channel = (await client.channels.cache.get(process.env.CHANNEL_ID)) as TextChannel
          channel.send(`${user.name} ${access}`).then(() => {
            client.destroy()
          })
        }
      })

      client.login(process.env.DiscordBotTOKEN)

      // if (user.userId) {
      //   const postContent = { userId: user.userId, floorId: floorId, access: access }
      //   postAccess(postContent)
      // }
    }
  })
}

const checkAccess = async (body: IBodystring) => {
  const { token, version, appId, access, floorId } = body
  // const { token, version, appId, floor, access } = body
  // console.log('token = ', token)
  if (version !== currentVersion) {
    // versionが異なるときの処理
  }
  if (appId !== currentAppId) {
    // appIdが異なるときの処理
  }
  main(token, access, floorId)
    .then(async () => {
      await prisma.$disconnect()
    })
    .catch(async (e) => {
      console.error(e)
      await prisma.$disconnect()
      process.exit(1)
    })
}

export default checkAccess
