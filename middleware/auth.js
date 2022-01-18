const { user } = require('../models')

module.exports = {
  sanitizer: (req, res, next) => {
    const { username, email, password } = req.body
    if (!username && !password) throw new Error('Masukanb Form')
    if (username && password) {
      if (email) next()
      next()
    }
  },

  loginValidasi: (req, res, next) => {
    const { username, password } = req.body

    user.getDataBy(username)
      .then(response => {
        const getUser = response[0][0]
        console.log(getUser.password)
        console.log(password)
        if (username === getUser.username) {
          if (password !== getUser.password)
            throw new Error('login failed')
          res.locals.username = username
          next()
        }
      }).catch(e => new Error('gagal dapat data'))
  }
}