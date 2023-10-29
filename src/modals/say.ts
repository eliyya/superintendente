import { ModalSubmitInteraction } from 'offdjs/djs'

export async function handler (ctx: ModalSubmitInteraction) {
    if (!ctx.inCachedGuild()) return
    const content = ctx.fields.getTextInputValue('content')
    if (!content) return await ctx.reply('Mesage is not optional')
    void ctx.channel?.send(content)
    return await ctx.reply({
        content: 'message sent',
        ephemeral: true,
    })
}
