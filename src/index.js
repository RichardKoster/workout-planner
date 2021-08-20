import './main.scss';
import { calendar } from '@app/state';
import { Calendar } from '@app/ui/calendar/calendar';

const app = document.querySelector('#app');
app.appendChild(calendar.element);
const cal = new Calendar();
cal.setup();
cal.render();
