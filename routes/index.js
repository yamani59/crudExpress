const route = require('express').Router()

route.route('/login')
  .get((req, res) => {
    res.json({ nama: 'yamani' })
  })
  .post((req, res) => {
    console.log(req.sessionID)
    console.log(req.session)

    const { username, password } = req.body
    if (username && password) {
      if (req.session.authenticated) res.json({ session: req.session })
      if (password === '12345678') {
        req.session.authenticated = true
        req.session.user = { username, password }
        res.locals.nama = 'yamani'
        console.log(res.locals)
        res.json(req.session)
      }
    }
    res.status(403).json({ msg: 'Bad Credentials' })
  })

route.route('/')
  .get((req, res) => {
    res.render('home')
  })

module.exports = route