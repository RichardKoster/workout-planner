import { app } from "@app/application";
import { CALENDAR_DAY_SELECTED } from "@app/events/events";
import { calendar, currentDay } from "@app/state";
import {
  CALENDAR_ITEMS,
  CURRENT_DAY,
  EXERCISES,
  Storage,
} from "@app/storage/storage";
import { addItemsModal, currentDayTemplate } from "./template";

export class CurrentDay {
  constructor() {
    this.storage = new Storage();
  }

  getTemplate() {
    const template = document.createElement("div");
    template.innerHTML = currentDayTemplate;

    return template.firstElementChild;
  }

  getElement() {
    return document.querySelector(".current-day");
  }

  getHeaderElement() {
    return this.getElement().querySelector(".header");
  }

  getDaylineElement() {
    return this.getHeaderElement().querySelector(".day-line");
  }

  getDayPlanningElement() {
    return this.getElement().querySelector(".day-planning");
  }

  init() {
    this.renderHeader();
    this.renderDayItems();

    this.addListeners();
  }

  renderHeader() {
    this.getDaylineElement().textContent = this.getDayLine();
  }

  renderDayItems() {
    const calendarItems = this.storage.get(CALENDAR_ITEMS, {});
    if (!calendarItems.hasOwnProperty(this.getDayLine())) {
      return;
    }

    const dayExerciseGroups = calendarItems[this.getDayLine()];
    const containerTemplate = document.getElementById(
      "planning-group-template"
    );
    const itemTemplate = document.getElementById("planning-item-template");
    const planningContainer = this.getDayPlanningElement().cloneNode();
    dayExerciseGroups.map((group) => {
      const cardElement = document.importNode(containerTemplate.content, true);
      cardElement.querySelector("[data-group-name]").textContent = group.name;

      group.exercise.map((exercise) => {
        let itemElement = document.importNode(itemTemplate.content, true);
        itemElement.querySelector("[data-name]").textContent = exercise;

        cardElement
          .querySelector("[data-item-container]")
          .appendChild(itemElement);
      });
      planningContainer.appendChild(cardElement);
    });
    this.getDayPlanningElement().replaceWith(planningContainer);
  }

  dayChanged(e) {
    currentDay.currentDay.date = new Date(
      calendar.date.year,
      calendar.date.month - 1,
      e.detail.day
    );
    this.storage.save(CURRENT_DAY, currentDay.currentDay.date);

    this.getDaylineElement().textContent = this.getDayLine();
  }

  getDate() {
    const format = Intl.DateTimeFormat("en", { day: "numeric", month: "long" });
    const dateParts = format.formatToParts(currentDay.currentDay.date);
    const date = {};
    dateParts.map((part) => {
      date[part.type] = part.value;
    });

    return date;
  }

  getDayLine() {
    return `${this.getDate().day} ${this.getDate().month}`;
  }

  addListeners() {
    document.addEventListener(CALENDAR_DAY_SELECTED, (e) => this.dayChanged(e));
    this.getElement()
      .querySelector("#add-item")
      .addEventListener("click", () => {
        this.showAddItemsModal();
      });
  }

  showAddItemsModal() {
    const modalTemplate = document.createElement("div");
    modalTemplate.innerHTML = addItemsModal;
    const modal = modalTemplate.firstElementChild;

    const exerciseGroups = this.storage.get(EXERCISES, []);
    const options = [];
    exerciseGroups.map((exerciseGroup) => {
      const option = document.createElement("option");
      option.setAttribute("value", exerciseGroup.name);
      option.textContent = exerciseGroup.name;
      options.push(option.outerHTML);
    });
    modal.querySelector("#items").innerHTML = options.join("");

    app.appendChild(modal);

    app.querySelector(".modal-overlay").addEventListener("click", (e) => {
      if (e.target.className === "modal-overlay") {
        this.closeAddItemsModal();
      }
    });
    modal.querySelector("[data-cancel]").addEventListener("click", () => {
      this.closeAddItemsModal();
    });
    modal.querySelector("[data-submit]").addEventListener("click", () => {
      this.submit(modal);
    });
  }

  closeAddItemsModal() {
    const overlay = app.querySelector(".modal-overlay");
    if (overlay) {
      overlay.remove();
    }
  }

  submit(modal) {
    const selected = modal.querySelector("#items").value;
    const exercises = this.storage.get(EXERCISES, []);
    const selectedExercise = exercises.find(
      (exercise) => exercise.name === selected
    );

    const calendarItems = this.storage.get(CALENDAR_ITEMS, {});
    if (!calendarItems.hasOwnProperty(this.getDayLine())) {
      calendarItems[this.getDayLine()] = [];
    }

    calendarItems[this.getDayLine()].push(selectedExercise);
    this.storage.save(CALENDAR_ITEMS, calendarItems);

    this.closeAddItemsModal();
  }
}
