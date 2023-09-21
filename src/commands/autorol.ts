import { ChatInputCommandInteraction } from 'offdjs/djs'

export async function handler (ctx: ChatInputCommandInteraction) {
    if (ctx.options.getSubcommand() === 'create') return await create(ctx)
    if (ctx.options.getSubcommand() === 'add') return await add(ctx)
    if (ctx.options.getSubcommand() === 'remove') return await remove(ctx)
}

async function create (ctx: ChatInputCommandInteraction) {
    void ctx.reply('en desarrollo')
}

async function add (ctx: ChatInputCommandInteraction) {
    void ctx.reply('en desarrollo')
}

async function remove (ctx: ChatInputCommandInteraction) {
    void ctx.reply('en desarrollo')
}

export const name = 'autorol'
