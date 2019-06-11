const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const helmet = require('helmet')

// Configure dotenv.
require('dotenv').config()

// Create Express app.
const app = express()

// Add helmet.
app.use(helmet())

// Add CORS.
const whitelist = ['http://localhost:8080']
app.use(
  cors({
    origin(origin, callback) {
      if (whitelist.includes(origin) || !origin) {
        callback(null, true)
      } else {
        const error = new Error('Not allowed by CORS.')
        error.statusCode = 403
        callback(error)
      }
    }
  })
)

// Add a public folder.
app.use(express.static('public'))

// Add error handling middleware.
app.use(require('./middlewares/errorHandler'))

// Connect to MongoDB.
async function connectToMongoDB() {
  try {
    await mongoose.connect(
      `mongodb://@${process.env.DB_HOST}:${process.env.DB_PORT}`,
      {
        useNewUrlParser: true,
        user: process.env.DB_USER,
        pass: process.env.DB_PASS,
        dbName: process.env.DB_NAME,
        auth: {
          authdb: process.env.DB_NAME
        }
      }
    )
  } catch (e) {
    console.error(e)
  }
}
connectToMongoDB()

// Start the server.
const port = 3000
app.listen(port, () => console.info(`Server started on port ${port}.`))
