const express = require('express');
const app = express();
const morgan = require('./config/morgan');
const authMiddleware = require('./middleware/auth');
const authRoutes = require('./routes/auth');
const tweetsRoutes = require('./routes/tweets');
const followRoutes = require('./routes/followrelations');
const cors = require('cors')

app.use(cors())
app.use(express.json());
app.use(morgan)

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
//   res.setHeader('Access-Control-Allow-Headers', '*');
//   next();
// })

app.use('/api', authRoutes)
app.use('/api', authMiddleware)
app.use('/api', tweetsRoutes)
app.use('/api', followRoutes)

app.listen(2021)