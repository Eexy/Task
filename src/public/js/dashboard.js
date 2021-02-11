import Task from './Task.js';

const taskList = document.querySelector('tasks-list');
const taskTitle = document.querySelector('#task-title');
const form = document.querySelector('#createTaskForm');

async function createTask(title) {
  const params = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title }),
  };

  const res = await fetch('/tasks', params);
  const json = await res.json();

  if (!json.error) {
    const task = new Task(json._id, json.title, json.completed, taskList);
    taskList.add(task);
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  createTask(taskTitle.value);

  const modal = document.querySelector('#create-task-modal');
  closeModal('#'+modal.getAttribute('id'));
});
