const express = require('express');
const User = require('../database/models/user');
const auth = require('../middlewares/auth');

const router = express.Router();

router.get('/users/login', (req, res) => {
  res.render('login', { title: 'Login' });
});

router.post('/users/login', async (req, res) => {
  // try to find the user
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.cookie('jwt', token, { httpOnly: true });
    res.send(user.toJson());
  } catch (e) {
    // if the user doesn't exist in the database send back an error
    res.status(400).send({ error: 'unable to find the user' });
  }
});

router.get('/users/logout', auth, async (req, res) => {
  try {
    const { user } = req;
    user.tokens = [];
    await user.save();
    res.clearCookie('jwt');
    res.redirect('/users/login');
  } catch (e) {
    res.status(401).send({ error: e });
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
      req.body.password
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

router.get('/dashboard', auth, (req, res) => {
  try {
    const { user } = req;

    if (!user) {
      return res.redirect('/users/login');
    }

    res.status(200).render('dashboard', { title: 'Dashboard' });
  } catch (e) {
    res.redirect('/users/login');
  }
});

module.exports = router;
