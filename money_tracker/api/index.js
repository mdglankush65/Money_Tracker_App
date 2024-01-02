const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
dotenv.config();
const port = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());
app.get('/api/test', (req, res) => {
    res.json({ body: 'test ok' });
});
app.post('/api/transaction',(req,res)=>{
    res.json(req.body);
});
app.listen(port, () => {
    console.log('You are now connected on port', port);
});