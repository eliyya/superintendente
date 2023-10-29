import { autorolController } from '#controller'
import {
    ActionRowBuilder,
    ChatInputCommandInteraction,
    EmbedBuilder,
    ModalBuilder,
    PermissionFlagsBits,
    SlashCommandBuilder,
    SlashCommandRoleOption,
    SlashCommandStringOption,
    SlashCommandSubcommandBuilder,
    TextInputBuilder,
    TextInputStyle,
} from 'offdjs/djs'
import { autorol } from 'src/models/autorol/interface.js'

export async function handler (ctx: ChatInputCommandInteraction) {
    if (ctx.options.getSubcommand() === 'create') return await create(ctx)
    if (ctx.options.getSubcommand() === 'add') return await add(ctx)
    if (ctx.options.getSubcommand() === 'remove') return await remove(ctx)
    if (ctx.options.getSubcommand() === 'delete') return await delete_(ctx)
    if (ctx.options.getSubcommand() === 'deploy') return await deploy(ctx)
    if (ctx.options.getSubcommand() === 'list') return await list(ctx)
}

async function create (ctx: ChatInputCommandInteraction) {
    if (!ctx.inCachedGuild()) return
    const name = ctx.options.getString('name', true)
    try {
        const config = await autorolController.create(ctx.guildId, name)
        void ctx.reply({
            content: `Autorol ${config.name} created`,
        })
    } catch (error) {
        console.error(error)
        void ctx.reply('Hubo un problema')
    }
}

async function add (ctx: ChatInputCommandInteraction) {
    if (!ctx.inCachedGuild()) return
    const group = ctx.options.getString('group', true)
    const role = ctx.options.getRole('role', true)
    try {
        await autorolController.add(group, ctx.guildId, role.id)
        void ctx.reply({
            content: `Rol ${role.name} added to ${group} group`,
        })
    } catch (error) {
        if ((error as Error).message === 'Group not found') {
            void ctx.reply({
                content: `Group ${group} not found`,
            })
        }
    }
}

async function remove (ctx: ChatInputCommandInteraction) {
    if (!ctx.inCachedGuild()) return
    const group = ctx.options.getString('group', true)
    const role = ctx.options.getRole('role', true)
    try {
        await autorolController.remove(group, ctx.guildId, role.id)
        void ctx.reply({
            // eslint-disable-next-line @typescript-eslint/no-base-to-string, @typescript-eslint/restrict-template-expressions
            content: `Rol ${role} removido de ${group}`,
        })
    } catch (error) {
        void ctx.reply({
            content: `Group ${group} not found`,
        })
    }
}

async function delete_ (ctx: ChatInputCommandInteraction) {
    if (!ctx.inCachedGuild()) return
    const group = ctx.options.getString('group', true)
    try {
        await autorolController.delete_(ctx.guildId, group)
    } catch (error) {
        void ctx.reply({
            content: `Group ${group} not found`,
        })
    }
}

async function deploy (ctx: ChatInputCommandInteraction) {
    if (!ctx.inCachedGuild()) return
    const group = ctx.options.getString('group', true)
    try {
        const config = await autorolController.get(ctx.guildId, group)
        void ctx.showModal(
            new ModalBuilder()
                .setCustomId(`autorol:deploy:${config.id}`)
                .setTitle('Autorol ' + config.name)
                .setComponents(
                    new ActionRowBuilder<TextInputBuilder>()
                        .setComponents(
                            new TextInputBuilder()
                                .setCustomId('content')
                                .setLabel('Message')
                                .setPlaceholder('Selecciona un rol')
                                .setRequired(true)
                                .setStyle(TextInputStyle.Paragraph),
                        ),
                ),
        )
    } catch (error) {
        void ctx.reply({
            content: `Group ${group} not found`,
        })
    }
}

async function list (ctx: ChatInputCommandInteraction) {
    if (!ctx.inCachedGuild()) return
    await ctx.reply('Sending...')
    const autoroles: autorol[] = []
    try {
        await Promise.all((await autorolController.getGuild(ctx.guildId)).map(a => autoroles.push(a)))
    } catch (error) {
        console.log(error)
        return await ctx.editReply('Hubo un problema')
    }
    if (!autoroles.length) return await ctx.editReply('No hay registros')
    for (const a of autoroles) {
        try {
            await ctx.channel?.send({
                embeds: [
                    new EmbedBuilder()
                        .setTitle(a.name)
                        .setFooter({
                            text: `ID: ${a.id}`,
                        })
                        .setDescription(a.roles.map(r => `<@&${r}>`).join(' ')),
                ],
            })
        } catch (error) {
            console.log(error)
            return await ctx.editReply('Hubo un problema')
        }
        await new Promise(resolve => setTimeout(resolve, 1_000))
    }
    return await ctx.editReply('enviados')
}

export const command = new SlashCommandBuilder()
    .setName('autorol')
    .setDescription('Configuracion de Autoroles')
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addSubcommand(
        new SlashCommandSubcommandBuilder()
            .setName('create')
            .setDescription('Crear un grupo de autoroles')
            .addStringOption(
                new SlashCommandStringOption()
                    .setName('name')
                    .setDescription('Nombre del grupo')
                    .setRequired(true),
            ),
    )
    .addSubcommand(
        new SlashCommandSubcommandBuilder()
            .setName('add')
            .setDescription('Crear un grupo de autoroles')
            .addStringOption(
                new SlashCommandStringOption()
                    .setName('group')
                    .setDescription('Nombre del grupo')
                    .setRequired(true),
            )
            .addRoleOption(
                new SlashCommandRoleOption()
                    .setName('role')
                    .setDescription('Rol a agregar')
                    .setRequired(true),
            ),
    )
    .addSubcommand(
        new SlashCommandSubcommandBuilder()
            .setName('remove')
            .setDescription('Elimina un rol de un grupo')
            .addStringOption(
                new SlashCommandStringOption()
                    .setName('group')
                    .setDescription('Nombre del grupo')
                    .setRequired(true),
            )
            .addRoleOption(
                new SlashCommandRoleOption()
                    .setName('role')
                    .setDescription('Rol a eliminar')
                    .setRequired(true),
            ),
    )
    .addSubcommand(
        new SlashCommandSubcommandBuilder()
            .setName('delete')
            .setDescription('Elimina un grupo entero')
            .addStringOption(
                new SlashCommandStringOption()
                    .setName('group')
                    .setDescription('Nombre del grupo')
                    .setRequired(true),
            ),
    )
    .addSubcommand(
        new SlashCommandSubcommandBuilder()
            .setName('deploy')
            .setDescription('Depliega el autorol')
            .addStringOption(
                new SlashCommandStringOption()
                    .setName('group')
                    .setDescription('Nombre del grupo')
                    .setRequired(true),
            ),
    )
    .addSubcommand(
        new SlashCommandSubcommandBuilder()
            .setName('list')
            .setDescription('List the autoroles groups'),
    )
