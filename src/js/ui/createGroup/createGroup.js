import { app } from "@app/application";
import { EXERCISES, Storage } from "@app/storage/storage";
import { serialize } from "@app/util/form";
import { addGroupTemplate, inputTemplate } from "./template";

export class CreateGroup {
  constructor() {
    this.storage = new Storage();
  }

  getTemplate() {
    const template = document.createElement("div");
    template.innerHTML = addGroupTemplate;

    return template.firstElementChild;
  }

  getElement() {
    return document.querySelector(".overlay.add-group");
  }

  getExerciseHolder() {
    return this.getElement().querySelector(".exercise-holder");
  }

  getForm() {
    return this.getElement().querySelector("form");
  }

  getSubmitButton() {
    return this.getElement().querySelector("[data-submit]");
  }

  open() {
    app.appendChild(this.getTemplate());

    this.getElement()
      .querySelector('[name="add-exercise"]')
      .addEventListener("click", () => {
        this.insertInput();
      });

    this.getSubmitButton().addEventListener("click", () => {
      this.submit();
    });
  }

  insertInput() {
    const input = document.createElement("div");
    input.innerHTML = inputTemplate;

    this.getExerciseHolder().appendChild(input.firstElementChild);
  }

  submit() {
    const data = new FormData(this.getForm());

    const exercises = this.storage.get(EXERCISES, []);
    exercises.push(serialize(data));
    this.storage.save(EXERCISES, exercises);

    this.getElement().remove();
  }
}
