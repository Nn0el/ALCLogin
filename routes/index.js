const express = require('express')
const router = express.Router()

router.get('/', function (req, res) {
  res.render('index.njk', { title: 'Welcome' })
})

router.get('/login', function (req, res) {
    res.render('login.njk', { title: 'Welcome' })
  })

  router.get('/secret', function (req, res) {
    res.render('secret.njk', { title: 'Welcome' })
  })

module.exports = router