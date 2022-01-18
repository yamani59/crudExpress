require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const path = require('path')
const store = new session.MemoryStore()
const app = express()

const PORT = process.env.PORT || 3300

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '/public')))
app.use(session({
  secret: process.env.SECRET,
  saveUninitialized: false,
  cookie: { maxAge: 3000 },
  store
}))
app.set('view engine', 'ejs')

app.use((req, res, next) => {
  console.log(store)
  next()
})


const routes = require('./routes')
app.use('/', routes)

app.listen(PORT, function () { console.log('running in port ' + PORT) })