const tasksList = document.querySelector('.tasks-list');
const form = document.querySelector('form');
const input = document.querySelector('input');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if(input.value !== ''){
        createTask(input.value);
    }
});

function createTask(title){
    const task = document.createElement('li');
    task.classList.add('task');
    const taskTitle = document.createElement('h3');
    taskTitle.classList.add('task-title');
    taskTitle.innerText = title;
    task.appendChild(taskTitle);
    tasksList.appendChild(task);
}