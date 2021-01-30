const express = require('express');

const router = express.Router();

// Connect form
router.get('/users/login', (req, res) => {
  res.render('login', { title: 'Login' });
});

router.post('/users/login', (req, res) => {
  res.send('<h1>Welcome</h1>');
});

router.get('/users/createUser', (req, res) => {
  res.render('createUser', { title: 'Create Account' });
});

router.post('/users/createUser', (req, res) => {
  res.send({ user: 'test' });
});

module.exports = router;
