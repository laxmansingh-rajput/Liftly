import mysql from 'mysql2/promise'
import dotenv from 'dotenv'
dotenv.config()


const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.dbPassword,
    database: 'Liftly',
})


export default connection