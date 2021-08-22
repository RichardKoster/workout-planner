import { currentDay } from "@app/state";

export class CurrentDay {
  constructor() {}

  setup() {
    currentDay.element.className = 'current-day';

    const header = this.renderHeader();
    currentDay.element.appendChild(header);
  }

  renderHeader() {
    const header = document.createElement('div');
    header.className = 'header';

    const dayLine = document.createElement('span');
    dayLine.className = 'day-line';
    const format = Intl.DateTimeFormat('en', {day: '2-digit', month: 'long'});
    const dateParts = format.formatToParts(currentDay.currentDay.date);
    const date = {};
    dateParts.map((part) => {
      date[part.type] = part.value;
    });
    dayLine.textContent = `${date.day} ${date.month}`;
    header.appendChild(dayLine);

    return header;
  }
}