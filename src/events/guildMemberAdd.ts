import { GuildMember, AttachmentBuilder } from 'offdjs/djs'
import { welcomeConfigController } from '#controller'
import { join } from 'node:path'
import Canvas from 'canvas'
import Jimp from 'jimp'

export async function handler (member: GuildMember) {
    const guild = member.guild
    const config = await welcomeConfigController.get(member.guild.id)
    if (!config.channel) return
    const channel = guild.channels.cache.get(config.channel)
    if (!channel) return
    if (!channel.isTextBased()) return
    const bgpath = join(process.cwd(), 'imgs', 'background.png')
    const background = await Canvas.loadImage(config.background ?? 'https://cdn.discordapp.com/attachments/1153183774473981952/1153184007341756416/background.png')
    const canvas = Canvas.createCanvas(background.width, background.height)
    const ctx = canvas.getContext('2d')
    ctx.drawImage(background, 0, 0)
    config.message ??= 'Bienvenido {member} a {guild}'
    config.message = config.message
        .replace(/\{member\}/g, member.toString())
        .replace(/\{guild\}/g, guild.name)

    const maskText = Canvas.createCanvas(background.width, background.height)
    const ctxMask = maskText.getContext('2d')
    ctxMask.fillStyle = '#000000'
    ctxMask.fillRect(0, 0, background.width, background.height)

    Canvas.registerFont(join(process.cwd(), 'fonts', 'Ginto', 'ABCGintoNordVariable.ttf'), {
        family: 'Ginto Nord',
    })
    Canvas.registerFont(join(process.cwd(), 'fonts', 'Ginto', 'ABCGintoNormalVariable.ttf'), {
        family: 'Ginto',
    })
    ctx.font = 'bold 50px Ginto Nord'
    ctx.fillStyle = '#ffffff'
    const textLength = ctx.measureText('Bienvenido')
    ctxMask.fillStyle = '#ffffff'
    ctxMask.fillRect(250, 55, textLength.width, 50)

    ctx.font = 'bold 40px Ginto'
    const nameLength = ctx.measureText('@' + member.displayName)
    ctxMask.fillRect(250, 115, nameLength.width, 40)

    ctx.font = 'bold 30px Ginto'
    const desLength = ctx.measureText('A ' + member.guild.name)
    ctxMask.fillRect(250, 175, desLength.width, 30)

    const back = await Jimp.read(bgpath)
    const mask = await Jimp.read(maskText.toBuffer())
    back.blur(10)
    back.mask(mask, 0, 0)
    ctx.drawImage(await Canvas.loadImage(await back.getBufferAsync(Jimp.MIME_PNG)), 0, 0)

    ctx.font = 'bold 50px Ginto Nord'
    ctx.fillText('Bienvenido', 250, 100)
    ctx.font = 'bold 40px Ginto'
    ctx.fillText('@' + member.displayName, 250, 150)
    ctx.font = 'bold 30px Ginto'
    ctx.fillText('A ' + member.guild.name, 250, 200)

    const pfp = await Jimp.read(member.displayAvatarURL({ extension: 'png', size: 1024 }))
    pfp.resize(200, 200)
    const circleMask = await Jimp.read('./imgs/circle_mask.png')
    circleMask.resize(200, 200)
    pfp.mask(circleMask, 0, 0)

    const pfpBuffer = await pfp.getBufferAsync(Jimp.MIME_PNG)
    const pfpImage = await Canvas.loadImage(pfpBuffer)
    ctx.drawImage(pfpImage, 25, 25, 200, 200)

    const img = canvas.toBuffer()
    const attachment = new AttachmentBuilder(img, {
        name: `welcome_${member.displayName}.png`,
        description: config.message,
    })

    await channel.send({
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        content: config.message,
        files: [attachment],
    })
}
