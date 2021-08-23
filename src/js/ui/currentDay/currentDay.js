import { CALENDAR_DAY_SELECTED } from "@app/events/events";
import { calendar, currentDay } from "@app/state";
import { CURRENT_DAY, Storage } from "@app/storage/storage";
import { currentDayTemplate } from "./template";

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

  init() {
    this.renderHeader();

    this.addListeners();
  }

  renderHeader() {
    this.getDaylineElement().textContent = this.getDayLine();
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
  }
}
