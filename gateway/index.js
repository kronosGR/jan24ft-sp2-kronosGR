const express = require('express');
const cors = require('cors');
const proxy = require('express-http-proxy');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/product', proxy('http://localhost:8001/'));
app.use('/customer', proxy('http://localhost:8002/'));
app.use('/manager', proxy('http://localhost:8003/'));

app.listen(process.env.PORT, () => {
  console.log('Gateway is running on Port ' + process.env.PORT);
});
