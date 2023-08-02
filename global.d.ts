declare namespace NodeJS {
    interface processEnv {
        NODE_ENV: 'development' | 'production'
        DISCORD_TOKEN: string
        TWITCH_ID: string
        TWITCH_SECRET: string
    }
}
