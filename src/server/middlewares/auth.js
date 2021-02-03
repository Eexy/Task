const User = require('../database/models/user');

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    const user = await User.findOne({ 'tokens.token': token });
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ error: 'You need to be logged to access the page' });
  }
};

module.exports = auth;
