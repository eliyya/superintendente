// import { createCanvas, loadImage } from 'canvas'
import {
    // AttachmentBuilder,
    Client,
    // EmbedBuilder
} from 'offdjs/djs'
// import { join } from 'path'
// import {handler as guildMemberAdd} from './guildMemberAdd.js'

export async function handler (client: Client<true>) {
    console.log(`Logged in as ${client.user.username}!`)
    // const bot = client.guilds.cache.get('1011373470451499148')?.members.me as GuildMember
    // client.emit('guildMemberAdd', bot)

    // const guild = client.guilds.cache.get('1128547453449273384')
    // if (!guild) return
    // const channel = guild.channels.cache.get('1128547453449273387')
    // if (!channel) return
    // if (!channel.isTextBased()) return
    // const img = await loadImage(join(process.cwd(), 'imgs', 'background.png'))
    // const canvas = createCanvas(img.width, img.height)
    // const ctx = canvas.getContext('2d')
    // ctx.drawImage(img, 0, 0)
    // const attachment = new AttachmentBuilder(canvas.toBuffer(), { name: 'bg.png' })
    // const embed = new EmbedBuilder().setImage('attachment://bg.png')
    // void channel.send({
    //     embeds: [embed],
    //     files: [attachment],
    // })
    // const member = await guild?.members.fetch('694370846403330098')
    // guildMemberAdd(member!)

    // Invite Script
    // const guild = client.guilds.cache.get('1128547453449273384')
    // guild?.invites.fetch().then(invites => {
    //     for (const invite of invites.values()) {
    //         console.log(invite.code, invite.uses, invite.url)
    //     }
    // })

    // // Admin Script
    // const guild = client.guilds.cache.get('1128547453449273384')
    // const role = guild?.roles.cache.get('1128557032006488064')
    // const user = await guild?.members.fetch('534614025271771158')
    // user?.roles.add(role!)
}
