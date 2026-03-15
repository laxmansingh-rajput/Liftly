import oauth from 'passport-google-oauth20'
import express from 'express'
import passport from 'passport';
import connection from '../confiq/connection.js';
import { queryUser, insertIntoUsers } from '../controller/queryUser.js';

var GoogleStrategy = oauth.Strategy;
const router = express.Router()

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.backend}/auth/google/callback`
},
    async function (accessToken, refreshToken, profile, cb) {
        let checkIfEmailExists = await queryUser(connection, profile._json.email)
        if (checkIfEmailExists) {
            console.log('return cookies')
        } else {
            await insertIntoUsers(connection, profile)
        }
    }
));

router.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: `${process.env.Frontend}/login` }),
    function (req, res) {
        res.redirect(`${process.env.Frontend}/`);
    }
);

export default router