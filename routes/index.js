const route = require('express').Router()
const { user } = require('../models')
const { auth } = require('../middleware')

route.route('/')
  .get((req, res) => {
    if (req.session.loggedIn)
      res.
        res.render('home')
  })
  .post(auth.sanitizer, auth.loginValidasi, (req, res) => {
    req.session.username = res.locals.username
    req.session.loggedIn = true
    res.redirect('dashboard')
  })

route.route('/reg')
  .get((req, res) => {
    res.render('req')
  })

module.exports = route