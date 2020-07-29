const express = require('express');
const app = express();
const morgan = require('./config/morgan')


app.use(express.json());
app.use(morgan)

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', '*');
  next();
})

app.listen(2021)