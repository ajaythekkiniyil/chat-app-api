const mongoose = require('mongoose')

const connectDb = async() =>{
    await mongoose.connect('mongodb://127.0.0.1:27017/chat', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });
}

module.exports = connectDb