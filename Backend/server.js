import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.js'
const app = express()

dotenv.config()
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.use('/auth', authRoutes)

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on process.env.PORT ${process.env.PORT}`)
})
