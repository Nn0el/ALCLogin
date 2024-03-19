const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt');
const pool = require('../db');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const HASHFRÅNDB = 'BLABLA'

router.get('/', function (req, res) {
  res.render('index.njk', { title: 'Welcome' })
})

router.get('/login', function (req, res) {
  res.render('login.njk')
})

router.post('/login', async function (req, res) {
  const user = req.body.username
  const password = req.body.password
  console.log(user, password)
  const [result] = await pool.promise().query('SELECT * FROM patch_login Where username = ?', [user])
  console.log(result)

  bcrypt.compare(password, result[0].password, function (err, result) {
    if (result == true) {
      console.log(result, 'inloggad')
      req.session.user = req.body.user
      res.redirect('/secret') 
      console.log(user)
      // res.redirect
    } else {
      console.log(result, 'inte inloggad >:(')
      res.redirect('/login')
    }
  });
  console.log(result)
})


router.get('/secret', function (req, res) {
  res.render('secret.njk', { title: 'Welcome' })
})

router.get('/hash', async function (req, res) {

  bcrypt.hash("roblox", 10, function (err, hash) {

    console.log(hash);
    return res.json(hash);
  });

})

router.get('/dbtest', async function (req, res) {
  const pool = require('../db')
  const [data] = await pool.promise().query('SELECT * FROM patch_login')
  res.json({ data })
})

router.get('/users', function (req, res) {
  res.render('users.njk', { title: 'Welcome' })
})

module.exports = router