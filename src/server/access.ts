import type { IBodystring } from './types/access'
import { PrismaClient } from '@prisma/client'
import { Client } from 'discord.js'
import type { TextChannel } from 'discord.js'
import dotenv from 'dotenv'

dotenv.config()

const prisma = new PrismaClient()
const client = new Client({
  intents: ['DirectMessages', 'Guilds', 'GuildMembers', 'GuildMessages', 'MessageContent'],
})

const currentVersion = '1.0.0'
const currentAppId = '1'

const checkAccess = async (body: IBodystring) => {
  const { token, version, appId, access, floorId } = body
  if (version !== currentVersion) {
    // versionが異なるときの処理
  }
  if (appId !== currentAppId) {
    // appIdが異なるときの処理
  }
  const user = await prisma.user.findUnique({
    where: { token: token },
  })

  if (!user || user.allow !== 'yes') {
    return false
  }
  await prisma.accessLog.create({
    data: {
      floorId: floorId,
      access: access,
      userId: user.userId,
    },
  })

  // UserIdを使ってUserOrganizationからorganizationIdを取得
  const userOrganizations = await prisma.userOrganization.findMany({
    where: { userId: user.userId },
    select: {
      organization: {
        select: {
          discordChannelId: true,
        },
      },
    },
  })

  // organizationIdを使ってOrganizationからdiscordChannelIdを取得し、
  // Discordチャンネルにメッセージを送信
  for (const userOrg of userOrganizations) {
    if (userOrg.organization) {
      const channelId = userOrg.organization.discordChannelId
      const channel = (await client.channels.cache.get(channelId)) as TextChannel

      if (channel) {
        channel.send(`${user.name} ${access}`)
      }
    }
  }
  client.login(process.env.DiscordBotTOKEN)
  return true
}

export default checkAccess
