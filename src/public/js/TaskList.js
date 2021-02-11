import Task from '../js/Task.js';

class TaskList extends HTMLElement {
  constructor() {
    super();
    this.nbTasks = null;
    this.attachShadow({ mode: 'open' });
  }

  async connectedCallback() {
    this.render();
    this.nbTasks = 0;
  }

  async fetchTask() {
    const res = await fetch('http://localhost:3000/tasks');
    const json = await res.json();

    json.forEach((task) => {
      const temp = new Task(task._id, task.title, task.completed, this);
      this.add(temp);
    });
  }

  render() {
    const { shadowRoot } = this;

    shadowRoot.innerHTML = `
      <style>
        :host{
          display: block;
          width: 100%;
        }

        .no-task-msg{
          display: block;
        }

        .tasks-list{
          display: none;
        }

        .no-task{
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
        }

        .no-task__msg{
          font-size: 2rem;
          color: #8D8D8D;
        }

        .no-task__illustration{
          display: block;
          height: 300px;
        }

      </style>
      <div class='no-task'>
        <p class="no-task__msg">You have no task to complete</p>
        <img src="../images/illustration.svg" class="no-task__illustration" />
      </div>
      <div class='tasks-list'></div>
      `;
    this.fetchTask();
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
      shadowRoot.querySelector('.no-task').style.display = 'flex';
    } else {
      shadowRoot.querySelector('.tasks-list').style.display = 'block';
      shadowRoot.querySelector('.no-task').style.display = 'none';
    }
  }
}

customElements.define('tasks-list', TaskList);
