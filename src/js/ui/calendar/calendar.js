import { CALENDAR_DAY_SELECTED } from "@app/events/events";
import { Dispatcher } from "@app/events/dispatcher";
import { calendar, currentDay } from "@app/state";
import { MONTHS } from "@app/const";
import { CALENDAR_MONTH, CALENDAR_YEAR, Storage } from "@app/storage/storage";
import { calenderTemplate } from "./templates";
export class Calendar {
  constructor() {
    this.dispatcher = new Dispatcher();
    this.storage = new Storage();
  }

  setup() {
    this.renderMonthSelector();
    this.renderDaysHeader();

    this.addListeners();
  }

  render() {
    while (this.getDaysContainer().firstChild) {
      this.getDaysContainer().removeChild(this.getDaysContainer().firstChild);
    }
    this.renderMonthSelector();

    const container = document.createElement("div");
    container.className = "days-container";
    const template = document.getElementById("day-template");
    const prefixTemplate = document.getElementById("prefix-day-template");

    [...Array(this.getPrefixDays()).keys()]
      .map((i) => i + 1)
      .forEach(() => {
        const prefixDay = document.importNode(prefixTemplate.content, true);
        container.appendChild(prefixDay);
      });
    for (let day of this.getDays()) {
      const dayElement = document.importNode(template.content, true);
      dayElement.querySelector(".number").textContent = day;
      dayElement.firstElementChild.setAttribute("date-day", day);
      if (this.isCurrentDay(day, calendar.date.month, calendar.date.year)) {
        dayElement.firstElementChild.classList.add("current");
      }
      if (this.isSelectedDay(day, calendar.date.month, calendar.date.year)) {
        dayElement.firstElementChild.classList.add("selected");
      }

      container.appendChild(dayElement);
    }
    this.getDaysContainer().replaceWith(container);

    const days = document.querySelectorAll(".day.day-number");
    for (const day of days) {
      day.addEventListener("click", (e) => {
        const selected = this.getDaysContainer().querySelector(".selected");
        if (selected !== null) {
          selected.classList.remove("selected");
        }
        day.classList.add("selected");
        this.dispatcher.fire(CALENDAR_DAY_SELECTED, {
          day: e.target.getAttribute("date-day"),
        });
      });
    }
  }

  getCalenderElement() {
    return document.querySelector(".calendar");
  }

  getMonthHolder() {
    return this.getCalenderElement().querySelector(".month-holder");
  }

  getDaysHeader() {
    return this.getCalenderElement().querySelector(".header-container");
  }

  getDaysContainer() {
    return this.getCalenderElement().querySelector(".days-container");
  }

  renderMonthSelector() {
    const selectedMonthName = MONTHS[calendar.date.month];
    this.getMonthHolder().querySelector("#month").textContent =
      selectedMonthName;
    this.getMonthHolder().querySelector("#year").textContent =
      calendar.date.year;
  }

  getDays() {
    const days = new Date(calendar.date.year, calendar.date.month, 0).getDate();

    return [...Array(days).keys()].map((i) => i + 1);
  }

  getPrefixDays() {
    const firstDayOfMonth = new Date(
      calendar.date.year,
      calendar.date.month - 1,
      1
    );

    return firstDayOfMonth.getUTCDay();
  }

  renderDaysHeader() {
    const dayNames = ["ma", "tue", "wed", "thur", "fri", "sat", "sun"];
    for (let name of dayNames) {
      const headerItem = document.createElement("div");
      const headerItemSpan = document.createElement("span");
      headerItemSpan.textContent = name;
      headerItem.appendChild(headerItemSpan);
      this.getDaysHeader().appendChild(headerItem);
    }
  }

  isCurrentDay(day, month, year) {
    const currentDate = new Date();

    return (
      currentDate.getDate() === day &&
      currentDate.getMonth() + 1 === month &&
      currentDate.getFullYear() === year
    );
  }

  isSelectedDay(day, month, year) {
    const current = {
      day: currentDay.currentDay.date.getDate(),
      month: currentDay.currentDay.date.getMonth() + 1,
      year: currentDay.currentDay.date.getFullYear(),
    };

    return (
      day === current.day && month === current.month && year === current.year
    );
  }

  changeMonth(e) {
    let targetMonth = e.target.classList.contains("next")
      ? calendar.date.month + 1
      : calendar.date.month - 1;
    let targetYear = calendar.date.year;
    if (targetMonth == 0) {
      targetMonth = 12;
      targetYear = calendar.date.year - 1;
    }
    if (targetMonth == 13) {
      targetMonth = 1;
      targetYear = calendar.date.year + 1;
    }

    calendar.date.month = targetMonth;
    calendar.date.year = targetYear;
    this.storage.save(CALENDAR_MONTH, targetMonth);
    this.storage.save(CALENDAR_YEAR, targetYear);
    this.render();
  }

  addListeners() {
    const monthButtons = document.querySelectorAll(".month-switch-button");
    for (const button of monthButtons) {
      button.addEventListener("click", (e) => this.changeMonth(e));
    }
  }

  getTemplate() {
    const template = document.createElement("div");
    template.innerHTML = calenderTemplate;

    return template.firstElementChild;
  }
}
