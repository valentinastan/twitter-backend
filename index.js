const express = require('express');
const app = express();
const morgan = require('./config/morgan');
const authMiddleware = require('./middleware/auth');
const authRoutes = require('./routes/auth');
const tweetsRoutes = require('./routes/tweets');

app.use(express.json());
app.use(morgan)

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', '*');
  next();
})

app.use('/api', authRoutes)
// app.use('/api', authMiddleware)
app.use('/api', tweetsRoutes)

app.listen(2021)