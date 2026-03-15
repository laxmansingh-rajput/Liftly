import mysql from 'mysql2/promise'
import dotenv from 'dotenv'
dotenv.config()


const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.dbPassword,
    database: 'Liftly',
})

// await connection.execute(`
    // CREATE TABLE IF NOT EXISTS users (
    // id INT AUTO_INCREMENT PRIMARY KEY,
    // emailId VARCHAR(255) NOT NULL,
    // admin BOOLEAN DEFAULT FALSE,
    // password VARCHAR(255),
    // profilePicture VARCHAR(255),
    // driverRating FLOAT DEFAULT 0,
    // riderRating FLOAT DEFAULT 0,
    // driverRatedCount INT DEFAULT 0,
    // riderRatedCount INT DEFAULT 0
// )
// `);

export default connection