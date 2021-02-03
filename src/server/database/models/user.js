const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    validate(val) {
      if (!validator.isEmail(val)) {
        throw new Error('You must provide an email address');
      }
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

schema.statics.findByCredentials = async (mail, pwd) => {
  const user = await User.findOne({ email: mail });

  if (user === null) {
    throw new Error('Unable to find user');
  }

  const isMatch = await bcrypt.compare(pwd, user.password);
  
  if (!isMatch) {
    throw new Error('Unable to login');
  }

  return user;
};

schema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.SECRET);

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

schema.pre('save', async function (next) {
  const user = this;

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 10);
  }

  next();
});

const User = mongoose.model('User', schema);

module.exports = User;
