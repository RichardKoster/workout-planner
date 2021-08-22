import './main.scss';
import { calendar, currentDay } from '@app/state';
import { Calendar } from '@app/ui/calendar/calendar';
import { CurrentDay } from '@app/ui/currentDay/currentDay';

const app = document.querySelector('#app');
app.appendChild(calendar.element);
app.appendChild(currentDay.element)
const cal = new Calendar();
cal.setup();
cal.render();

const currentDayObj = new CurrentDay;
currentDayObj.setup();
