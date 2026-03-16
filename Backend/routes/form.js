import express from 'express'
import { refreshToken } from '../controller/jwt.js';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import twilio from "twilio";
import { editPhone } from '../model/queryUser.js';

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

const client = twilio(process.env.twilioSid, process.env.twilioAuth);
const SERVICE_ID = "VA6acfaf4c350e8ca3311ffc2deb537e05";

router.post("/phone", async (req, res) => {
    try {
        const phone = req.body.phone;

        const verification = await client.verify.v2
            .services(SERVICE_ID)
            .verifications.create({
                to: `+91${phone}`,
                channel: "sms",
            });

        res.json({
            success: true,
            message: "OTP sent successfully",
            status: verification.status,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to send OTP",
        });
    }
});

router.post("/verify-phone", async (req, res) => {
    try {
        const { phone, otp } = req.body;

        const verificationCheck = await client.verify.v2
            .services(SERVICE_ID)
            .verificationChecks.create({
                to: `+91${phone}`,
                code: otp,
            });

        if (verificationCheck.status === "approved") {
            let token = (req.cookies.accessToken) ? req.cookies.accessToken : req.cookies.refreshToken
            let details = jwt.verify(token, process.env.jwtSecret)
            let status = editPhone(phone, details.id)
            if (status) {
                return res.json({
                    success: true,
                    message: "Phone verified successfully",
                });
            } else {
                res.json({
                    success: false,
                    message: "something went wrong",
                });
            }
        }

        res.json({
            success: false,
            message: "Invalid OTP",
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "OTP verification failed",
        });
    }
});

router.post('/', async (req, res) => {
    try {
        let data = req.body
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