import jwt from 'jsonwebtoken'
import { configDotenv } from 'dotenv'
import dotenv from "dotenv";

import { queryUserById } from '../model/queryUser.js'

export const createAccessToken = (data) => {
    try {
        let token = jwt.sign(data, process.env.jwtSecret, {
            expiresIn: '15m'
        })
        return token
    } catch (err) {
        console.log(err)
        return null
    }
}

export const createRefershToken = (data) => {
    try {
        let token = jwt.sign(data, process.env.jwtSecret, {
            expiresIn: '7d'
        })
        return token
    } catch (err) {
        console.log(err)
        return null
    }
}

export const refreshToken = async (token, res) => {
    try {
        if (!token) {
            console.log("Refresh token missing");
            return false;
        }

        const data = jwt.verify(token, process.env.jwtSecret);
        console.log(token)
        console.log(data.id)
        const dataArray = await queryUserById(data.id)
        console.log(dataArray)

        let newData = {
            id: dataArray.id,
            email: dataArray.emailId,
            name: dataArray.name,
            isAdmin: dataArray.admin
        }
        console.log(newData)
        let accessToken = createAccessToken(newData)

        res.cookie('accessToken', accessToken, {
            maxAge: 900000,
            httpOnly: false,
            sameSite: 'None',
            secure: true,
        });
        return true
    }
    catch (err) {
        console.log(err)
        return false;
    }

}