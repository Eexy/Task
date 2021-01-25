export default class Task extends HTMLElement {
  constructor(title, priority, taskList) {
    super();
    this.title = title;
    this.isCompleted = false;
    this.priority = priority;
    this.attachShadow({ mode: 'open' });
    this.taskList = taskList;

    this.complete = this.complete.bind(this);
    this.delete = this.delete.bind(this);
  }

  connectedCallback() {
    this.render();
    // this.taskList.add(this);
  }

  disconnectedCallback() {
    const { shadowRoot } = this;
    shadowRoot
      .querySelector('input')
      .removeEventListener('click', this.complete);

    shadowRoot
      .querySelector('.delete-btn')
      .removeEventListener('click', this.delete);
  }

  render() {
    const { shadowRoot } = this;
    shadowRoot.innerHTML = `
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        :host{
          display: flex;
          align-items: center;
          padding: 0.5rem 1rem;
          margin: 1rem 0!important;
          border-radius: 3px;
          background: white;
        }

        .checkbox {
          padding-right: 1rem;
        }

        .task-title {
          font-weight: normal;
        }

        button{
          outline: none;
          cursor: pointer;
        }

        .delete-btn{
          display: block;
          background: red;
          color: white;
          border-radius: 3px;
          padding: 0.5rem 0.8rem;
          border: none;
          margin-left: auto;
        }

        .priority-tag{
          margin-left: auto;
          border-radius: 1rem;
          background: lightgrey;
          padding: 0.2rem 1rem;
          text-transform: capitalize;
        }

        .urgent{
          background: rgba(250, 37, 37, 0.50);
          color: white;
        }

        .normal{
          background: rgba(247, 216, 43, 0.50);
          color: white;
        }
      </style>
        <div class='checkbox'>
          <input type='checkbox'>
        </div>
        <h3 class='task-title'>${this.title}</h3>
        <div class='priority-tag ${this.priority}'>${this.priority}</div>
        <button class='delete-btn'>Delete</button>
    `;

    shadowRoot.querySelector('input').addEventListener('click', this.complete);
    shadowRoot
      .querySelector('.delete-btn')
      .addEventListener('click', this.delete);
  }

  complete() {
    this.isCompleted = !this.isCompleted;
  }

  delete() {
    this.taskList.deleteTask(this);
  }
}

customElements.define('task-item', Task);
