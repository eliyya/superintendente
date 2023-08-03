import Express from 'express'

const app = Express()

app.get('/webhook/twitch/:ID', (req, res) => {
    console.log(req.params.ID)
    res.send('ok')
})

app.listen(3000, () => {
    console.log('Listening on port 3000')
})

// health check
app.get('/health', (_req, res) => {
    res.send('ok')
})

app.use(Express.json())
