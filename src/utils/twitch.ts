import 'dotenv/config'
// import WebSocket from 'ws'

const req = await fetch('https://id.twitch.tv/oauth2/token', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
        client_id: 'dp8wtwtflaubp0wpgc90d7csir85v6',
        client_secret: process.env.TWITCH_SECRET as string,
        grant_type: 'client_credentials',
    }),
})

const res = await req.json() as {
    access_token: string
    expires_in: number
    token_type: string
}

process.env.TWITCH_TOKEN = res.access_token
process.env.TWITCH_EXPIRES = (Date.now() + res.expires_in).toString()
process.env.TWITCH_TYPE = res.token_type

// fetch('https://api.twitch.tv/helix/users?login=maelcode', {
//     method: 'GET',
//     headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${process.env.TWITCH_TOKEN}`,
//         'Client-ID': process.env.TWITCH_ID as string,
//     },
// }).then(async res => await res.json()).then(console.log).catch(console.error)

// const twitch = new WebSocket('wss://eventsub.wss.twitch.tv/ws')
// 175250425
// 506934262

// twitch.on('open', () => {
//     console.log('open')
// })

// eslint-disable-next-line @typescript-eslint/no-misused-promises
// twitch.on('message', async (data: Buffer) => {
//     const msg = JSON.parse(data.toString()) as TwitchEvent
//     console.log(msg)

//     if (msg.metadata.message_type === 'session_welcome') {
//         process.env.TWITCH_SESSION_ID = msg.payload.session.id as string
//         try {
await register('175250425', process.env.TWITCH_TOKEN)
await register('506934262', process.env.TWITCH_TOKEN)
//         } catch (error) {
//         }
//     }
// })

// twitch.on('close', () => {
//     console.log('closed')
// })

// twitch.on('ping', () => {
//     console.log('ping')
//     twitch.pong()
// })

// interface TwitchEvent {
//     metadata: {
//         message_id: string
//         message_timestamp: string
//         message_type: string
//     }
//     payload: {
//         [key: string]: any
//     }
// }

export async function register (id: string, token: string) {
    try {
        const req = await fetch('https://api.twitch.tv/helix/eventsub/subscriptions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
                'Client-ID': process.env.TWITCH_ID as string,
                Aceept: 'application/json',
            },
            body: JSON.stringify({
                type: 'stream.online',
                version: '1',
                condition: {
                    broadcaster_user_id: id,
                },
                transport: {
                    method: 'webhook',
                    callback: 'https://webhook.site/0290d75a-cad3-4dfa-803b-698b8f2c0dcd',
                },
            }),
        })
        console.log(await req.json())
    } catch {

    }
}
