import { menu } from "@app/state";

export class Menu {
  constructor() {
    menu.element.className = 'menu';
  }

  render() {
    const titleEl = document.createElement('h1');
    titleEl.textContent = "Workout planner";
    menu.element.appendChild(titleEl);

    const actions = document.createElement('div');
    actions.className = "actions";
    const addAction = this.createAction('fas fa-plus', 'add');
    actions.appendChild(addAction);
    menu.actions.push(addAction);
    
    menu.element.appendChild(actions);

    for (const action of menu.actions) {
      action.addEventListener('click', (e) => {
        const actionName = e.target.getAttribute('data-action');
        switch (actionName) {
          case 'add':
            
            break;
        }
      });
    }
  }

  createAction(icon, action) {
    const actionEl = document.createElement('div');
    actionEl.className = 'action';
    actionEl.setAttribute('data-action', action);
    const iconEl = document.createElement('i');
    iconEl.className = icon;
    actionEl.appendChild(iconEl);

    return actionEl;
  }
}
