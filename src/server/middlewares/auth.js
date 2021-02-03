const User = require('../database/models/user');

/*
  Recherche l'utilisateur dans la base de donnée si il exist renvoi l'u
*/

const auth = async (req, res, next) => {
  try {
    const tokenCookie = req.cookie;
    const user = await User.findOne({ tokenCookie });
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ error: "User doesn't exist" });
  }
};

module.exports = auth;
