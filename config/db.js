const mongoose = require('mongoose');
const config = require('config');
const mongoUrl = config.get('mongoURL');

const connectDB = async () => {
    try {
        await mongoose.connect(mongoUrl, {
            useNewUrlParser: true
        })
        console.log('Mongoose Connected ...')
    } catch (err) {
        console.log(err.message);
        process.exit(1)
    }
}

module.exports = connectDB;