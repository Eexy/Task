import Task from '../js/Task.js';

class TaskList extends HTMLElement {
  constructor() {
    super();
    this.nbTasks = null;
    this.tasksList = [];
    this.attachShadow({ mode: 'open' });
  }

  async connectedCallback() {
    await this.fetchTask();
    this.render();
    this.nbTasks = 0;
  }

  async fetchTask() {
    const res = await fetch('http://localhost:3000/tasks');
    const json = await res.json();

    this.tasksList = json;
  }

  render() {
    const { shadowRoot } = this;

    shadowRoot.innerHTML = `
      <style>
        :host{
          display: block;
        }

        .no-task-msg{
          display: block;
        }

        .tasks-list{
          display: none;
        }
      </style>

      <p class='no-task-msg'>You have no task to finish</p>
      <div class='tasks-list'></div>
    `;

    this.tasksList.forEach((task) => {
      const temp = new Task(task._id, task.title, task.completed, this);
      this.add(temp);
    });
  }

  add(task) {
    this.nbTasks += 1;
    const { shadowRoot } = this;
    shadowRoot.querySelector('.tasks-list').appendChild(task);
    this.isEmpty();
  }

  deleteTask(task) {
    this.nbTasks -= 1;
    const { shadowRoot } = this;
    shadowRoot.querySelector('.tasks-list').removeChild(task);
    this.isEmpty();
  }

  isEmpty() {
    const { shadowRoot } = this;
    if (this.nbTasks === 0) {
      shadowRoot.querySelector('.tasks-list').style.display = 'none';
      shadowRoot.querySelector('.no-task-msg').style.display = 'block';
    } else {
      shadowRoot.querySelector('.tasks-list').style.display = 'block';
      shadowRoot.querySelector('.no-task-msg').style.display = 'none';
    }
  }
}

customElements.define('tasks-list', TaskList);
