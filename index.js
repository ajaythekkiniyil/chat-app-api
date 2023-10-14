const express = require('express')
const app = express()
const chatRouter = require('./routes/chat')
const userRouter = require('./routes/user')
const connectDb = require('./controller/db')
const bodyParser = require('body-parser')
const cors = require('cors')


connectDb()
app.use(cors())
app.use(bodyParser.json())
app.get('/', (req, res) => { res.send('Welcome to chat api') })
app.use('/chat', chatRouter)
app.use('/user', userRouter)


const port = process.env.PORT || 3000
app.listen(port, () => console.log(`server listen on port:${port}`))