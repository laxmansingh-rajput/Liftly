import oauth from 'passport-google-oauth20'
import express from 'express'
import passport from 'passport';
import connection from '../confiq/connection.js';
import { createAccessToken, createRefershToken } from '../controller/jwt.js'

import { queryUser, insertIntoUsers } from '../controller/queryUser.js';

var GoogleStrategy = oauth.Strategy;
const router = express.Router()

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.backend}/auth/google/callback`
},
    async function (accessToken, refreshToken, profile, cb) {
        try {
            let details = await queryUser(connection, profile._json.email)
            if (details.length == 0) {
                await insertIntoUsers(connection, profile)
                details = await queryUser(connection, profile._json.email)
            }
            return cb(null, details)
        } catch(err) {
            console.log(err)
            return cb(err, null)
        }
    }
));

router.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: `${process.env.Frontend}/login` }),
    function (req, res) {
        try {

            let details = req.details
            let data = {
                id: details[0],
                email: details[1],
                name: details[2],
                isAdmin: details[3]
            }
            let rData = {
                id: details[0],
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

            if (!details[4]) {
                res.redirect(`${process.env.Frontend}/form`);
            }
            res.redirect(`${process.env.Frontend}/`);
        } catch(err) {
            return res.status(500).json({ error: 'Something went wrong' });
        }
    }
);

export default router