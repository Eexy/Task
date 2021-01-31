const express = require('express');

const router = express.Router();

const users = [];

router.get('/users/login', (req, res) => {
  res.render('login', { title: 'Login' });
});

router.post('/users/login', (req, res) => {
  // send back to the dashboard if the user exist
  const user = req.body;
  let exist = false;

  users.forEach((temp) => {
    if (temp.email === user.email && temp.pwd === user.pwd) {
      exist = true;
    }
  });

  if (!exist) {
    res.send({ error: "User doesn't exist" });
  }

  res.redirect('/tasks');
});

router.get('/users/createUser', (req, res) => {
  res.render('createUser', { title: 'Create Account' });
});

router.post('/users/createUser', (req, res) => {
  /*
    Create a new user and add it in the database
    if the user already exist send back an error
    else redirect to the dashboard
  */
  const user = req.body;
  let exist = false;

  users.forEach((temp) => {
    if (temp.email === user.email && temp.pwd === user.pwd) {
      exist = true;
    }
  });

  if (exist) {
    res.send({ error: 'User already exist' });
  }

  res.redirect('/tasks');
});

module.exports = router;
