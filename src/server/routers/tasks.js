const express = require('express');
const Task = require('../database/models/task');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/tasks', async (req, res) => {
  const task = new Task(req.body);
  await task.save();

  res.send(task);
});

module.exports = router;
