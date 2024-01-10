const express = require('express');
// const mongoose = require('mongoose');
const Transaction= require('./models/Transaction.js');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
const connectdb = require('./db.js');
dotenv.config();
const port = process.env.PORT || 8080;
app.use(cors({
    origin: 'http://localhost:3000',  // Adjust this to your React app's origin
    optionsSuccessStatus: 200,
}));
app.use(express.json());
// mongoose.connect(process.env.MONGO_URI);
connectdb();
// console.log("Connected");
app.get('/api/transactions', async (req, res) => {
    const transactions = await Transaction.find();
    res.json(transactions);
});
app.post('/api/transaction',async (req,res,Locals)=>{
    // await mongoose.connect(process.env.MONGO_URI);
    const {name,price,description,datetime}=req.body;
    const transaction= await Transaction.create({name,price,description,datetime});
    res.json(transaction);
});
app.listen(port, () => {  
    console.log('You are now connected on port', port);
});