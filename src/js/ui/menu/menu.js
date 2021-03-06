import { Dispatcher } from "@app/events/dispatcher";
import { menu } from "@app/state";
import { CreateGroup } from "../createGroup/createGroup";
import { menuTemplate } from "./template";

export class Menu {
  constructor() {
    menu.element.className = "menu";
    this.dispatcher = new Dispatcher();
  }

  getTemplate() {
    const template = document.createElement("div");
    template.innerHTML = menuTemplate;

    return template.firstElementChild;
  }

  getMenuElement() {
    return document.querySelector(".menu");
  }

  getActionsElement() {
    return this.getMenuElement().querySelector(".actions");
  }

  init() {
    for (const action of menu.actions) {
      const actionEl = this.createAction(action.icon, action.action);
      this.getActionsElement().appendChild(actionEl);
      actionEl.addEventListener("click", (e) => this.actionClicked(e));
    }
  }

  createAction(icon, action) {
    const container = document.createElement("div");
    container.innerHTML = `
    <div class="action" data-action="${action}">
      <i class="${icon}"></i>
    </div>
    `;

    return container.firstElementChild;
  }

  actionClicked(e) {
    const action = e.target.getAttribute("data-action");
    switch (action) {
      case "add":
        this.addGroup();
        break;
    }
  }

  addGroup() {
    new CreateGroup().open();
  }
}
