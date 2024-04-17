import express from 'express'
import cookieParser from 'cookie-parser'
import expressSession from 'express-session'
import LocalStrategy from 'passport-local'
import passport from 'passport'

import { checkPasswordAndReturnUserOrDie, getUserById } from './user/users.js'

const router = express.Router()

router.use(cookieParser())
router.use(expressSession({secret: '$3cr37', resave: false, saveUninitialized: false}))
router.use(passport.session())
passport.use(new LocalStrategy((username, password, done) => {
    (async () => {
        try {
            console.log('Passport is asking to check user', username, 'with password', password)
            const user = await checkPasswordAndReturnUserOrDie(username, password)
            console.log('Looking good!')
            return done(null, user)    
        }
        catch(error) {
            console.log('Nope!')
            done(null, false)
        }
    })()
}))

passport.serializeUser((user, done) => {
    console.log('Passport is asking to serialize user', user._id.toString())
    done(null, user._id)
})

passport.deserializeUser(async (id, done) => {
    (async ()=> {
        try {
            console.log('Passport is asking to deserialize user', id)
            const user = await getUserById(id)
            done(null, user)    
        }
        catch (error) {
            done(error)
        }    
    })()
})

router.get('/currentUser', (req, res) => {
    res.send(req.user)
})

router.post('/login', 
    passport.authenticate('local'),
    (req, res) => {
        res.send(req.user)
    }
)

router.get('/awesome-api-endpoint', (req, res) => {
    if (!req.user) {
        res.status(401).send("You must be authenticated to use this endpoint")
        return
    }
    res.send({ someMessage: "Hello " + req.user.userName})
})

router.get('/logout', (req, res) => {
    res.send('Goodbye')

})

export default router