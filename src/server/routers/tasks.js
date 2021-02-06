const express = require('express');
const Task = require('../database/models/task');
const auth = require('../middlewares/auth');

const router = express.Router();

// get all the tasks from the logged user
router.get('/tasks', auth, async (req, res) => {
  try {
    const { user } = req;
    const tasks = await Task.find({ owner: user._id });

    res.send(tasks);
  } catch (e) {
    res.send({ error: e });
  }
});

// get specifique task
router.get('/tasks/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!task) {
      return res.send({});
    }

    res.send(task);
  } catch (e) {
    res.send({ error: 'impossible to find task' });
  }
});

// update task
router.patch('/tasks/:id', auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['completed'];
  const isValidUpdates = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidUpdates) {
    return res.send({ error: 'Invalid update' });
  }

  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    updates.forEach((update) => {
      task[update] = req.body[update];
    });

    await task.save();
    res.send(task);
  } catch (e) {
    res.status(400).send({ error: 'impossible to update task' });
  }
});

// delete specifique task
router.delete('/tasks/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!task) {
      return res.send(404).send({});
    }

    res.send(task);
  } catch (e) {
    res.send({ error: "Unable to delete task or task doesn't exist" });
  }
});

// create a new task
router.post('/tasks', auth, async (req, res) => {
  try {
    const { user } = req;
    const task = new Task({ title: req.body.title, owner: user._id });
    await task.save();
    res.send(task);
  } catch (e) {
    res.send(e);
  }
});

module.exports = router;
