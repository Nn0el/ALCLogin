const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt');
const pool = require('../db');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const HASHFRÅNDB = 'BLABLA'

router.get('/', function (req, res) {
  res.render('index.njk', {
    title: 'Welcome',
    username: req.session.username
  })
})

router.get('/login', function (req, res) {
  res.render('login.njk')
})

router.post('/login', async function (req, res) {
  const userFromForm = req.body.username
  const passwordFromForm = req.body.password

  const [user] = await pool.promise().query('SELECT * FROM patch_login Where username = ?', [userFromForm])
  console.log(user)

  bcrypt.compare(passwordFromForm, user[0].password, function (err, result) {
    if (result == true) {
      console.log(result, 'inloggad')
      req.session.loggedin = true
      req.session.username = user[0].username

      console.log(req.session.loggedin)
      res.redirect('/secret')
      // res.redirect
    } else {
      console.log(result, 'inte inloggad >:(')
      res.redirect('/login')
    }
  });
})




router.get('/secret', function (req, res) {

  console.log(req.session.username)

  if (!req.session.username) {
    console.log("inte inloggad, stick")
    return res.redirect('/login')
  }



  res.render('secret.njk', { username: req.session.username })
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