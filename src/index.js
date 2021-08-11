import './main.scss';
import { Calendar } from './ui/calendar/calendar';

const app = document.querySelector('#app');
const calendar = new Calendar();

const calendarHtml = calendar.render(8, 2021);
app.appendChild(calendarHtml);
