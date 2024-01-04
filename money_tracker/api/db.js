const mongoose = require('mongoose');

async function connectdb() {
    const uri = process.env.MONGO_URI;
    try {
        await mongoose.connect(uri);
        console.log('Connected to mongoose');
    } catch (error) {
        console.error("Something is wrong. Unable to connect with mongoose", error);
        throw error;
    }
    // Uncomment the following block if you want to close the connection
    // finally {
        // await mongoose.connection.close();
        // console.log('Connection closed.');
    // }
    // Handling connection errors
    mongoose.connection.on('error', (err) => {
        console.error('MongoDB connection error:', err);
    });

}

module.exports = connectdb;
