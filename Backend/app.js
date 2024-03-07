const express = require('express');
// const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());




app.use('/api/v1', require('./routes/userRoute'));
app.use('/api/v1', require('./routes/productRoute'));
app.use('/uploads', express.static('uploads'));



module.exports = app;
