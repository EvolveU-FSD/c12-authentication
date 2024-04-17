import express from 'express'
import authBasic from './authBasic.js'
import authFormBased from './authFormBased.js'
import numberRequests from './numberRequests.js'

const app = express()

app.use(express.json())
app.use(numberRequests)

app.use('/basic', authBasic)
app.use('/form-based', authFormBased)

const PORT = process.env['PORT'] || 3000
app.listen(PORT, () => {
    console.log('Listening on localhost ' + PORT)
})