import { APPLICATION_PRE_INIT } from "@app/events/events";
import { calendar, currentDay } from "@app/state";
import { CALENDAR_MONTH, CALENDAR_YEAR, CURRENT_DAY, Storage } from "@app/storage/storage";
import { Calendar } from "@app/ui/calendar/calendar";
import { CurrentDay } from "@app/ui/currentDay/currentDay";
import { Dispatcher } from "@app/events/dispatcher";

export class Application {
  constructor() {
    this.storage = new Storage;
    this.dispatcher = new Dispatcher;
  }

  setListeners() {
    document.addEventListener(APPLICATION_PRE_INIT, (e) => {
      calendar.date.month = this.storage.get(CALENDAR_MONTH, (new Date).getMonth()+1);
      calendar.date.year = this.storage.get(CALENDAR_YEAR, (new Date).getFullYear());
      currentDay.currentDay.date = this.storage.get(CURRENT_DAY, new Date);
    });
  }

  init() {
    this.setListeners();
    this.dispatcher.fire(APPLICATION_PRE_INIT);
    const cal = new Calendar;
    cal.setup();
    cal.render();

    const currentDayObj = new CurrentDay;
    currentDayObj.setup();
  }
}