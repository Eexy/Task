import TaskList from './TaskList.js';
import Task from './Task.js';

const tasksList = document.querySelector('tasks-list');
const form = document.querySelector('form');
const input = document.querySelector('input');
const select = document.querySelector('select');

function createTask(title, priority) {
  const task = new Task(title, priority, tasksList);
  tasksList.add(task);
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (input.value !== '') {
    createTask(input.value, select.value);
  }
});
