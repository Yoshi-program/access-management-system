import type { Message } from 'discord.js'
import { Client } from 'discord.js'
import dotenv from 'dotenv'

dotenv.config()

const TOKEN = process.env.DiscordBotTOKEN
const PREFIX = '!'

const client = new Client({
  intents: ['Guilds', 'GuildMembers', 'GuildMessages'],
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
      const name = nameMatch[1]
      const studentId = studentIdMatch[1]
      message.reply(`名前: ${name}, 学籍番号: ${studentId}`)
    } else {
      message.reply('名前と学籍番号が正しく入力されていません。')
    }
  }
})

export const bot = () => {
  client.login(TOKEN)
}
