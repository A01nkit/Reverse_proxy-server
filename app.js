// npm run dev---->> to start the server on local machine

const express = require('express')
const cors = require('cors')
const rateLimit = require('express-rate-limit')
require('dotenv').config()

//Controller
const route = require('./routes');
  
const PORT = process.env.PORT || 5000

const app = express()

//Rate limiting
const limiter = rateLimit({
    windowMS: 10 * 60 * 1000, //10 minutes
    max: 5 // Limit each IP to 5 requests per `window` (here, per 10 minutes).
})
app.use(limiter)
app.set('trust proxy', 1)

//Set static folder
app.use(express.static('client'))

//Routes
app.use('/api', route);

//Enable cors
app.use(cors())  

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))