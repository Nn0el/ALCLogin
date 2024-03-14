const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

router.get('/', function (req, res) {
  res.render('index.njk', { title: 'Welcome' })
})

router.get('/login', function (req, res) {
  res.render('login.njk', { title: 'Welcome' })
})

router.get('/secret', function (req, res) {
  res.render('secret.njk', { title: 'Welcome' })
})

router.get('/hash', function (req, res) {
  bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
        // Store hash in your password DB.
    });
});

// Load hash from your password DB.
bcrypt.compare(myPlaintextPassword, hash, function(err, result) {
  // result == true
});
bcrypt.compare(someOtherPlaintextPassword, hash, function(err, result) {
  // result == false
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