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

  router.get('/dbtest', async function(req, res){
    const pool = require('../db')
    const [data] = await pool.promise().query('SELECT * FROM patch_login')
res.json({data})
  })

  router.get('/users', function (req, res) {
    res.render('users.njk', { title: 'Welcome' })
  })

module.exports = router