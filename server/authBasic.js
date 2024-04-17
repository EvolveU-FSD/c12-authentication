import express from 'express'
import authenticateWithBasic from './authenticateWithBasic.js'

const router = express.Router()

router.get('/', (req, res) => {
    // no authentication required to get here
    res.send(
        "<h1>Welcome to basic</h1>"+
        "<div><a href='/basic/using-headers'>Access route protected with header checked directly in the handler</a></div>"+
        "<div><a href='/basic/using-middleware'>Access route protected by middleware</a></div>"
    )
})

router.get('/using-headers', (req, res) => {
    // check the authorization header
    const authHeader = req.headers['authorization']
    if (!authHeader || !authHeader.startsWith('Basic ')) {
        console.log('Basic authentication not provided! Returning 401 with WWW-Authenticate header.  The browser should ask the user for credentials and then try again!')
        console.log()
        res.set('WWW-Authenticate', 'Basic realm="myserver"' )
        return res.sendStatus(401)    
    }
    
    // if we got this far, authentication header was present
    console.log('Got authorization header: ', authHeader)

    const usernamePasswordBase64 = authHeader.split(' ')[1]
    console.log('Here is the base64 encoded value', usernamePasswordBase64)

    const usernamePasswordDecoded = Buffer.from(usernamePasswordBase64, 'base64').toString('utf-8')
    console.log('Here is decoded username and password', usernamePasswordDecoded)

    const [username, password] = usernamePasswordDecoded.split(':')
    console.log('Here is where we should check the username', username, 'with the password', password)
    console.log('For now assume all is good without actually checking the password')

    res.send(
        '<h1>Hello ' + username +'</h1>'+
        '<a href="/basic/logout">Logout</a>'
    )
})

router.get('/using-middleware', authenticateWithBasic, (req, res) => {
    // user was populated on request using the middleware
    res.send(
        '<h1>Hello</h1>'+
        '<div>'+JSON.stringify(req.user)+'</div>'+
        '<a href="/basic/logout">Logout</a>'
    )
})

router.get('/login', authenticateWithBasic, (req, res) => {
    res.send(req.user)
})

router.get('/cool-api-endpoint', authenticateWithBasic, (req, res) => {
    res.send({ someField: 'some value', someOtherField: 'some other value'})
})

router.get('/logout', (req, res) => {
    res.status(401).send(
        '<h1>Logged out</h1>'+
        '<a href="/basic">Go back to start</a>'
    )
})

export default router