import Express from 'express'

const app = Express()

app.get('/webhook/twitch/:ID', (req, res) => {
    console.log(req.params.ID)
})

app.listen(3000, () => {
    console.log('Listening on port 3000')
})

app.use(Express.json())
