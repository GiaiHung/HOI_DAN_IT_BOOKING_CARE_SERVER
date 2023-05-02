import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import viewEngine from './config/viewEngine'
import initRouter from './routes/init'
import connect from './config/connectDB'
require('dotenv').config()

const app = express()
const PORT = process.env.PORT

app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  )
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
  res.setHeader('Access-Control-Allow-Credentials', true)
  next()
})

viewEngine(app)
initRouter(app)

connect()

app.listen(PORT, () => {
  console.log('Server is running on ' + PORT)
})
