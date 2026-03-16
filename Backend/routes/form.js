import express from 'express'
import { refreshToken } from '../controller/jwt.js';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import dotenv from "dotenv";
import { editProfile } from '../model/queryUser.js';

const router = express.Router()

router.use(async (req, res, next) => {
    try {

        if (!req.cookies || Object.keys(req.cookies).length === 0) {
            return res.json({
                success: false,
                error: 'Cookies not found'
            });
        }

        if (!("accessToken" in req.cookies) && ("refreshToken" in req.cookies)) {

            const check = await refreshToken(await req.cookies.refreshToken, res);

            if (check) {
                return next();
            } else {
                return res.json({
                    success: false,
                    error: 'something went wrong'
                });
            }
        }

        next();

    } catch (err) {
        console.log(err);
        return res.json({ error: 'something went wrong' });
    }
});

router.post('/', async (req, res) => {
    try {
        let data =  req.body
        console.log(data)
        let token = (req.cookies.accessToken) ? req.cookies.accessToken : req.cookies.refreshToken
        let details = jwt.verify(token, process.env.jwtSecret)
        let password = await bcrypt.hash(data.password, 10);
        let output = await editProfile(data.name, password, details.id)
        if (output) {
            return res.json({
                success: true,
                error: null
            });
        } else {
            return res.json({
                success: false,
                error: 'something went wrong'
            });
        }
    }
    catch (err) {
        console.log(err)
        return res.json({
            success: false,
            error: 'something went wrong'
        });
    }
})

export default router