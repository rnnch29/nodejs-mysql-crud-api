const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// router
const product = require('./routers/product')

dotenv.config();

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.status(200).json({
        msg: "This is my api running..."
    })
})

// API PRODUCT 
app.use('/api', product);

app.listen(PORT, () => {
    console.log(`server listening on ${PORT}`);
})


