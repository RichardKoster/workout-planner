import './main.scss';
import { calendar, currentDay } from '@app/state';
import { Application } from '@app/application';

const app = document.querySelector('#app');
app.appendChild(calendar.element);
app.appendChild(currentDay.element)
const application = new Application;
application.init();
