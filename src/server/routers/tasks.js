const express = require('express');
const Task = require('../database/models/task');

const router = express.Router();

router.get('/tasks', (req, res) => {
  res.render('task', { title: 'dashboard' });
});

router.post('/tasks', async (req, res) => {
  const task = new Task(req.body);
  await task.save();

  res.send(task);
});

module.exports = router;
