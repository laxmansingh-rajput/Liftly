import jwt from 'jsonwebtoken'
import { configDotenv } from 'dotenv'

export const createAccessToken = (data) => {
    try {
        let token = jwt.sign(data, process.env.jwtSecret, {
            expiresIn: '15m'
        })
        return token
    } catch(err) {
        return null
    }
}
export const createRefreshToken = (data) => {
    try {
        let token = jwt.sign(data, process.env.jwtSecret, {
            expiresIn: '7d'
        })
        return token
    } catch(err) {
        return null
    }
}