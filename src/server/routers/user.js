const express = require('express');
const User = require('../database/models/userModel');

const router = express.Router();

router.get('/users/login', (req, res) => {
  res.render('login', { title: 'Login' });
});

router.post('/users/login', async (req, res) => {
  // send back to the dashboard if the user exist
  const user = await User.findOne(req.body);

  // if user doesn't exit we send back an error
  if (!user) {
    res.send({ error: "User doesn't exist" });
  }

  res.redirect('/tasks');
});

router.get('/users/createUser', (req, res) => {
  res.render('createUser', { title: 'Create Account' });
});

router.post('/users/createUser', async (req, res) => {
  /*
    Create a new user and add it in the database
    if the user already exist send back an error
    else redirect to the dashboard
  */
  let user = await User.findOne(req.body);

  if (user) {
    res.send({ error: 'User already exist' });
  }

  user = new User(req.body);
  await user.save();

  res.redirect('/tasks');
});

module.exports = router;
