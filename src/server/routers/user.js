const express = require('express');

const router = express.Router();

// list of users
let users = [];

// Connect form
router.get('/users/login', (req, res) => {
  res.render('login', { title: 'Login' });
});

router.post('/users/login', (req, res) => {
  // get 
  res.send('<h1>Welcome</h1>');
});

router.get('/users/createUser', (req, res) => {
  res.render('createUser', { title: 'Create Account' });
});

router.post('/users/createUser', (req, res) => {
  // create user and store it in the array
  const user = req.body;
  users.push(user);
  res.send(user);
});

module.exports = router;
