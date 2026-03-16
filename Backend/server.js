import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from "cors";

import authRoutes from './routes/auth.js'
import formRoutes from './routes/form.js'
import detailsRoutes from './routes/details.js'

const app = express()

dotenv.config()
app.use(cookieParser());
app.use(express.json());

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/auth', authRoutes)
app.use('/form', formRoutes)
app.use('/details', detailsRoutes)

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on process.env.PORT ${process.env.PORT}`)
})
