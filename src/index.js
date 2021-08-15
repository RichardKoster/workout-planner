import './main.scss';
import { Calendar } from './ui/calendar/calendar';

const app = document.querySelector('#app');
const calendar = new Calendar();

calendar.setMonth(8);
calendar.setYear(2021);
const calendarHtml = calendar.render();
app.appendChild(calendarHtml);
calendar.setupEventListeners();
