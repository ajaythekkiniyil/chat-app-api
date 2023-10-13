const express = require('express')
const app = express()
const chatRouter = require('./routes/chat')
const userRouter = require('./routes/user')
const connectDb = require('./controller/db')
const bodyParser = require('body-parser')
const cors = require('cors')


connectDb()

// CORS configuration
const corsOptions = {
    origin: '*', // Change this to your specific origin or origins.
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'], // Add the headers you need.
};

app.use(cors(corsOptions))

app.use(bodyParser.json())
app.get('/', (req, res) => { res.send('Welcome to chat api') })
app.use('/chat', chatRouter)
app.use('/user', userRouter)

// Handle preflight requests (OPTIONS requests)
app.options('*', cors(corsOptions));

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`server listen on port:${port}`))