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

  router.get('/dbtest', function(req, res){
    res.render('dbtest.njk', {title: 'test'} )
  })

module.exports = router