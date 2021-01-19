const tasksList = document.querySelector('.tasks-list');
const form = document.querySelector('form');
const input = document.querySelector('input');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    createTask(input.value);
});

function createTask(title){
    const task = document.createElement('li');
    task.innerText = title;
    tasksList.appendChild(task);
}