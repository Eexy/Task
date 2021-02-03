const express = require('express');
const User = require('../database/models/user');

const router = express.Router();

router.get('/users/login', (req, res) => {
  res.render('login', { title: 'Login' });
});

router.post('/users/login', async (req, res) => {
  // try to find the user
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password,
    );
    const token = user.generateAuthToken();
    res.cookie('jwt', token, { httpOnly: true });
    res.redirect('/tasks');
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get('/users/createUser', (req, res) => {
  res.render('createUser', { title: 'Create Account' });
});

router.post('/users/createUser', async (req, res) => {
  try {
    // If we found user in database we redirect to his dashboard
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password,
    );
    const token = await user.generateAuthToken();
    res.cookie('jwt', token, { httpOnly: true, maxAge: 9000000000 });
    res.redirect('/tasks');
  } catch (e) {
    // If we don't find a user we created a new one
    const user = new User(req.body);
    const token = await user.generateAuthToken();
    res.cookie('jwt', token, { httpOnly: true, maxAge: 9000000000 });
    res.redirect('/tasks');
  }
});

module.exports = router;
