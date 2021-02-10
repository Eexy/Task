/* import Task from '../js/Task.js';
const taskList = document.querySelector('tasks-list');
const taskTitle = document.querySelector('#task-title');
const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  createTask(taskTitle.value);
});

async function createTask(title) {
  const params = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title }),
  };

  const res = await fetch('http://localhost:3000/tasks', params);
  const json = await res.json();

  if (!json.error) {
    const task = new Task(json._id, json.title, json.completed, taskList);
    taskList.add(task);
  }
} */
