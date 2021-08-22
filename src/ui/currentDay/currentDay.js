import { CALENDAR_DAY_SELECTED } from "@app/events/events";
import { calendar, currentDay } from "@app/state";
import { CURRENT_DAY, Storage } from "@app/storage/storage";

export class CurrentDay {
  constructor() {
    this.storage = new Storage;
  }

  setup() {
    currentDay.element.className = 'current-day';

    currentDay.header = this.renderHeader();
    currentDay.element.appendChild(currentDay.header);

    this.addListeners();
  }

  renderHeader() {
    const header = document.createElement('div');
    header.className = 'header';

    const dayLine = document.createElement('span');
    dayLine.className = 'day-line';
    dayLine.textContent = this.getDayLine();
    header.appendChild(dayLine);

    return header;
  }

  dayChanged(e) {
    currentDay.currentDay.date = new Date(calendar.date.year, calendar.date.month - 1, e.detail.day);
    console.log( currentDay.currentDay.date );
    this.storage.save(CURRENT_DAY, currentDay.currentDay.date);

    currentDay.header.querySelector('.day-line').textContent = this.getDayLine();
  }

  getDate() {
    const format = Intl.DateTimeFormat('en', {day: 'numeric', month: 'long'});
    const dateParts = format.formatToParts(currentDay.currentDay.date);
    const date = {};
    dateParts.map((part) => {
      date[part.type] = part.value;
    });

    return date;
  }

  getDayLine() {
    return `${this.getDate().day} ${this.getDate().month}`
  }

  addListeners() {
    document.addEventListener(CALENDAR_DAY_SELECTED, (e) => this.dayChanged(e))
  }
}