import type { Message } from 'discord.js'
import { Client } from 'discord.js'
import dotenv from 'dotenv'
import crypto from 'crypto'
import {
  addUserToOrganization,
  createUser,
  findUserByDiscordId,
  getAllOrganizations,
} from '../controllers/userController'
dotenv.config()

const TOKEN = process.env.DiscordBotTOKEN
const PREFIX = '!'

const client = new Client({
  intents: ['DirectMessages', 'Guilds', 'GuildMembers', 'GuildMessages', 'MessageContent'],
})

client.on('ready', () => {
  console.log(`Logged in as ${client.user?.tag}!`)
})

client.on('messageCreate', async (message: Message) => {
  if (message.author.bot) return
  if (!message.content.startsWith(PREFIX)) return

  const commandBody = message.content.slice(PREFIX.length)
  const args = commandBody.split(' ')

  if (!args.length) return

  const command = args.shift()?.toLowerCase()

  if (command === 'intro') {
    const intro = args.join(' ')
    const nameMatch = intro.match(/名前：(\S+)/)
    const studentIdMatch = intro.match(/学籍番号：(\S+)/)

    if (nameMatch && studentIdMatch) {
      const name = message.author.username
      const studentId = studentIdMatch[1]
      const discordId = message.author.id
      const userId = crypto.randomUUID()
      const token = crypto.randomUUID()
      const allow = 'yes'

      let user = await findUserByDiscordId(message.author.id)

      try {
        if (!user) {
          user = await createUser({
            name,
            userId,
            studentId,
            discordId,
            token,
            allow,
          })
          const discordUserId = client.users.cache.get(`${message.author.id}`)
          if (discordUserId) {
            const sendText = `https://localhost:3000/?token=${token} \nこのサイトはPWA(ホーム画面へのショートカット)に対応しています。PWAを使う方法は各自で調べてください。`
            discordUserId.send(sendText)
          }
        }

        // 組織を取得
        const organizations = await getAllOrganizations()

        // 適切な組織にユーザーを追加
        for (const organization of organizations) {
          if (organization.discordGuildId === message.guildId) {
            await addUserToOrganization(user.userId, organization.organizationId)
            break
          }
        }

        message.reply(`データベースへの登録に成功しました。`)
      } catch (error) {
        console.error(error)
        message.reply('データベースへの登録に失敗しました。')
      }
    } else {
      message.reply('名前と学籍番号が正しく入力されていません。')
    }
  }
})

export const bot = () => {
  client.login(TOKEN)
}
