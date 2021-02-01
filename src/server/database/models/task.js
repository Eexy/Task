const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
});

const Task = mongoose.model('task', schema);

module.exports = Task;
