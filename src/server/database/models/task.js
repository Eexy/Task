const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  completed: {
    type: Boolean,
    required: true,
    default: false,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    path: true,
  },
});

schema.methods.toJson = function () {
  const task = this;
  const taskObject = task.toObject();

  delete taskObject.owner;

  return taskObject;
};

const Task = mongoose.model('task', schema);

module.exports = Task;
