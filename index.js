const express = require('express');
const app = express();
const morgan = require('./config/morgan');
const authMiddleware = require('./middleware/auth');
const authRoutes = require('./routes/auth');


app.use(express.json());
app.use(morgan)

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', '*');
  next();
})

app.use(authRoutes)
app.use(authMiddleware)

app.listen(2021)