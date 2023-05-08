const connectToMongo = require('./db');
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
require('dotenv').config();
const app = express()
const connectDB = require('./config/db')
const port = 1000

// middleware
app.use(morgan("dev"))
app.use(bodyParser.json({ limit: "2mb" }))
app.use(cors())
app.use(express.json())//if we want to use req.body this middleware is required

// Static file
app.use(express.static('public'))
// Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/quiz', require('./routes/quiz'))
app.use('/api/result',require('./routes/Result'));
// Auto Route
 app.use('/api', require('./routes/fullcalendar' ))

connectToMongo();

app.listen(port, () => {
  console.log(`quiz backend listening on port ${port}`)
})


