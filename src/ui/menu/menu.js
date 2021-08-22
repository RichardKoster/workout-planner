import { menu } from "@app/state";
import { menuTemplate } from "./template";

export class Menu {
  constructor() {
    menu.element.className = 'menu';
  }

  getTemplate() {
    const template = document.createElement('div');
    template.innerHTML = menuTemplate;

    return template.firstElementChild;
  }

  getMenuElement() {
    return document.querySelector('.menu');
  }

  getActionsElement() {
    return this.getMenuElement().querySelector('.actions');
  }

  init() {
    for (const action of menu.actions) {
      this.getActionsElement().appendChild(this.createAction(action.icon, action.action));
    }
  }

  createAction(icon, action) {
    const container = document.createElement('div');
    container.innerHTML = `
    <div class="action" data-action="${action}">
      <i class="${icon}"></i>
    </div>
    `;
    return container.firstElementChild;
  }
}
