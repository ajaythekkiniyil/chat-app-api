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
    origin: 'http://localhost:5173', // Change this to your specific origin or origins.
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'], // Add the headers you need.
};

app.use(cors(corsOptions))

// Handle preflight requests (OPTIONS requests)
app.options('*', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    res.status(204).send();
});

app.use(bodyParser.json())
app.get('/', (req, res) => { res.send('Welcome to chat api') })
app.use('/chat', chatRouter)
app.use('/user', userRouter)


const port = process.env.PORT || 3000
app.listen(port, () => console.log(`server listen on port:${port}`))