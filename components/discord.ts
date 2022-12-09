import type { Message, TextChannel } from 'discord.js'
import { Client } from 'discord.js'
import { TOKEN } from './token'

const client = new Client({
  intents: ['Guilds', 'GuildMembers', 'GuildMessages'],
})

client.once('ready', () => {
  console.log('Ready!')
  console.log(client.user?.tag)
})
client.on('ready', async () => {
  const channel = client.channels.cache.get('channelid') as TextChannel
  channel.send('what you want to send to that channel')
})

client.on('messageCreate', async (message: Message) => {
  if (message.author.bot) return
  if (message.content.startsWith('!ping')) {
    message.channel.send('Pong!')
  }
})
client.login(TOKEN)

// import type { Client as ClientType, GuildMember, TextChannel } from 'discord.js'
// import { Client } from 'discord.js'
// import { CHANNEL_ID, TOKEN } from './token'

// //const Discord = require('discord.js')
// const client: ClientType = new Client({ intents: ['Guilds', 'GuildMessages', 'GuildMembers'] })

// client.login(TOKEN)

// client.on('ready', () => {
//   console.log(`${client.user?.tag}`)
// })

// client.on('guildMemberAdd', (member: GuildMember) => {
//   const TargetChannel = member.guild.channels.cache.get(CHANNEL_ID) as TextChannel
//   TargetChannel.send('Test Log!')
//   // const TargetChannel = member.guild.channels.cache.get('CHANNEL_ID')
//   // if (!TargetChannel) return
//   // if (TargetChannel.isText()) {
//   //   TargetChannel.send('Test Log!')
//   // }
//   // const channel: TextChannel = member.guild.channels.cache.get('<チャンネルID>')
//   // if (!channel) return
//   // channel.send(`**参加** ${member.user?.tag}さんが参加しました！`)
// })

// client.on('guildMemberRemove', (member: GuildMember | PartialGuildMember) => {
//   const channel = member.guild.channels.cache.get('<チャンネルID>')
//   if (!channel) return
//   channel.send(`**退出** ${member.user?.tag}さんが退出しました。`)
// })
