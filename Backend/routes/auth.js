import oauth from 'passport-google-oauth20'
import express from 'express'
import passport from 'passport';
import bcrypt from "bcrypt";
import { createAccessToken, createRefershToken } from '../controller/jwt.js'

import { queryUserByEmail, insertIntoUsers } from '../model/queryUser.js';

var GoogleStrategy = oauth.Strategy;
const router = express.Router()


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.backend}/auth/google/callback`
},
    async function (accessToken, refreshToken, profile, cb) {
        try {
            let details = await queryUserByEmail(profile._json.email)
            if (details.length == 0) {
                await insertIntoUsers(profile)
                details = await queryUserByEmail(profile._json.email)
            }
            return cb(null, details[0])
        } catch (err) {
            console.log(err)
            return cb(err, null)
        }
    }
));

router.get('/google',
    passport.authenticate('google', {
        scope: ['profile', 'email'],
        // hd: 'medicaps.ac.in',
        session: false
    }));

router.get('/google/callback',
    passport.authenticate('google', {
        failureRedirect: `${process.env.Frontend}/`, session: false
    }),
    function (req, res) {
        try {
            let details = req.user

            let data = {
                id: details.id,
                email: details.emailId,
                name: details.name,
                isAdmin: details.admin
            }
            let rData = {
                id: details.id,
            }
            let accessToken = createAccessToken(data);
            let refreshToken = createRefershToken(rData);
            if (!accessToken || !refreshToken) {
                return res.status(500).json({ error: 'Token generation failed' });
            }


            res.cookie('accessToken', accessToken, {
                maxAge: 900000,
                httpOnly: false,
                sameSite: 'None',
                secure: true,
            });

            res.cookie('refreshToken', refreshToken, {
                maxAge: 7 * 24 * 60 * 60 * 1000,
                httpOnly: false,
                sameSite: 'None',
                secure: true,
            });

            if (!details.password) {
                res.redirect(`${process.env.Frontend}/form`);
            } else if (!details.phoneNumber) {
                res.redirect(`${process.env.Frontend}/phone`);
            } else {
                res.redirect(`${process.env.Frontend}/home`);
            }
        } catch (err) {
            return res.status(500).json({ error: 'Something went wrong' });
        }
    }
);

router.post('/login', async (req, res) => {
    try {
        let data = req.body
        let queryData = await queryUserByEmail(data.email)

        if (queryData.length != 0) {
            let check = await bcrypt.compare(data.password, queryData[0].password);
            if (check) {
                let data = {
                    id: queryData[0].id,
                    email: queryData[0].emailId,
                    name: queryData[0].name,
                    isAdmin: queryData[0].admin
                }
                let rData = {
                    id: queryData[0].id,
                }
                let accessToken = createAccessToken(data);
                let refreshToken = createRefershToken(rData);

                if (!accessToken || !refreshToken) {
                    return res.status(500).json({
                        success: false,
                        message: "Email of Password is wrong"
                    })
                }

                res.cookie('accessToken', accessToken, {
                    maxAge: 900000,
                    httpOnly: false,
                    sameSite: 'None',
                    secure: true,
                });

                res.cookie('refreshToken', refreshToken, {
                    maxAge: 7 * 24 * 60 * 60 * 1000,
                    httpOnly: false,
                    sameSite: 'None',
                    secure: true,
                });

                res.json({
                    success: true,
                    message: "Login Successfull"
                })
            } else {
                res.json({
                    success: false,
                    message: "Email of Password is wrong"
                })
            }
        } else {
            res.json({
                success: false,
                message: "Email of Password is wrong"
            })
        }
    }
    catch (err) {
        console.log(err)
        res.json({
            success: false,
            message: "something went wrong"
        })
    }
})

export default router