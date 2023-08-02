import { Client } from 'offdjs/djs'
// import {handler as guildMemberAdd} from './guildMemberAdd.js'

export async function handler (client: Client<true>) {
    console.log(`Logged in as ${client.user.username}!`)

    // const guild = client.guilds.cache.get('1128547453449273384')
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
