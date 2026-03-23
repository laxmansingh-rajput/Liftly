import express from "express";
import { refreshToken } from "../controller/jwt.js";
import { queryUserById } from "../model/queryUser.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { insertIntoDriver } from "../model/insertDetails.js";
dotenv.config();

const router = express.Router();

router.use(async (req, res, next) => {
    try {
        if (!req.cookies || Object.keys(req.cookies).length === 0) {
            return res.json({
                name: null,
                password: false,
                phoneNo: false
            });
        }

        if (!("accessToken" in req.cookies) && ("refreshToken" in req.cookies)) {

            const check = await refreshToken(await req.cookies.refreshToken, res);

            if (check) {
                return next();
            } else {
                return res.json({
                    name: null,
                    password: false,
                    phoneNo: false
                });
            }
        }

        next();

    } catch (err) {
        console.log(err);
        return res.json({
            name: null,
            password: false,
            phoneNo: false
        });
    }
});


router.post("/Driver-details", async (req, res) => {
    try {
        console.log(req.body)

        const data = jwt.verify(req.cookies.refreshToken, process.env.jwtSecret);

        const id = data.id;

        await insertIntoDriver(id, req.body)

        res.json({
            success: true
        });

    } catch (err) {
        console.log(err);
        res.json({
            error: "something went wrong"
        });
    }
});

export default router;