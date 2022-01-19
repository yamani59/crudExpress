const route = require('express').Router()
const { user } = require('../models')
const { auth } = require('../middleware')

route.route('/')
  .get((req, res) => {
    if (req.session.loggedIn)
      res.redirect('/dashboard')
    res.render('home')
  })
  .post(auth.sanitizer, auth.loginValidasi, (req, res) => {
    req.session.username = res.locals.username
    req.session.loggedIn = true
    res.redirect('/dashboard')
  })

route.route('/reg')
  .get((req, res) => {
    res.render('req')
  })
  .post(auth.sanitizer, (req, res) => {
    try {
      user.insertData(req.body)
      console.log(req.body)
    } catch (e) {
      res.redirect('/reg')
    }
    res.redirect('/')
  })

route.route('/dashboard')
  .get((req, res) => {
    if (!req.session.loggedIn) res.redirect('/')
    res.render('dashboard', { user: req.session.username })
  })

route.route('/logout')
  .get((req, res) => {
    req.session.destroy()
    res.redirect('/')
  })
module.exports = route