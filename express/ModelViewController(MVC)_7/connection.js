const mongoose = require('mongoose');

async function connectMongoDB(url) {
    return mongoose.connect(url).then(() => {
        console.log('Connected to MongoDB database')})
    .catch((err) => {
        console.error('Error connecting to MongoDB database', err);
    });
}

module.exports = {
    connectMongoDB,
};