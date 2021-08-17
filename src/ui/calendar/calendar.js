import {events} from '../../events/events';
import { Dispatcher } from '../../events/dispatcher';
export class Calendar {

    constructor() {
        this.daysContainerEl = null
        this.calenderEl = null;
        this.wrapper = document.createElement('div');
        this.wrapper.id = 'calendar-wrapper';
        this.month = null;
        this.year = null;
        this.dispatcher = new Dispatcher(); 
    }

    render() {
        this.calendarEl = this.renderCalendar();
        this.calendarEl.appendChild(this.renderMonthSelector())
        this.calendarEl.appendChild(this.renderDaysHeader());

        this.daysContainerEl = this.renderDaysContainer();
        for (let _ of [...Array(this.getPrefixDays()).keys()].map(i => i + 1)) {
            const prefixEl = document.createElement('div');
            prefixEl.classList.add('day');
            this.daysContainerEl.appendChild(prefixEl);
        }
        for (let day of this.getDays()) {
            this.daysContainerEl.appendChild(this.renderDay(day));
        }
        this.calendarEl.appendChild(this.daysContainerEl);
        this.wrapper.innerHTML = this.calendarEl.outerHTML;

        return this.wrapper;
    }

    renderMonthSelector() {
        const months = {
            1: 'January', 
            2: 'February',
            3: 'March',
            4: 'April',
            5: 'May',
            6: 'June',
            7: 'July',
            8: 'August',
            9: 'September',
            10: 'October',
            11: 'November',
            12: 'December',
        };
        const selectedMonthName = months[this.month];
        const containerEl = document.createElement('div');
        containerEl.classList.add('month-selector-container');
        const prevButtonEl = document.createElement('div');
        prevButtonEl.classList.add('prev');
        prevButtonEl.classList.add('month-switch-button');
        const prevButtonIcon = document.createElement('i');
        prevButtonIcon.classList.add('fas');
        prevButtonIcon.classList.add('fa-angle-left');
        prevButtonEl.appendChild(prevButtonIcon);

        const nextButtonEl = document.createElement('div');
        nextButtonEl.classList.add('next');
        nextButtonEl.classList.add('month-switch-button');
        const nextButtonIcon = document.createElement('i');
        nextButtonIcon.classList.add('fas');
        nextButtonIcon.classList.add('fa-angle-right');
        nextButtonEl.appendChild(nextButtonIcon);

        const monthContainer = document.createElement('div');
        monthContainer.classList.add('month-holder');
        monthContainer.innerHTML = `<div><span>${selectedMonthName}</span><span>${this.year}</span></div>`;

        containerEl.appendChild(prevButtonEl);
        containerEl.appendChild(monthContainer);
        containerEl.appendChild(nextButtonEl);

        return containerEl;
    }

    getDays() {
        const days = new Date(this.year, this.month, 0).getDate();

        return [...Array(days).keys()].map(i => i + 1);
    }

    getPrefixDays() {
        const firstDayOfMonth = new Date(this.year, this.month-1, 1);

        return firstDayOfMonth.getUTCDay();
    }

    renderCalendar() {
        const calendarEl = document.createElement('div');
        calendarEl.classList.add('calendar');

        return calendarEl;
    }

    renderDaysContainer() {
        const daysContainerEl = document.createElement('div');
        daysContainerEl.classList.add('days-container');

        return daysContainerEl;
    }

    renderDaysHeader() {
        const dayNames = ['ma', 'tue', 'wed', 'thur', 'fri', 'sat', 'sun'];
        const headerContainerEl = document.createElement('div');
        headerContainerEl.classList.add('header-container')
        for (let name of dayNames) {
            const headerItem = document.createElement('div');
            const headerItemSpan = document.createElement('span');
            headerItemSpan.textContent = name;
            headerItem.appendChild(headerItemSpan);
            headerContainerEl.appendChild(headerItem);
        }

        return headerContainerEl;
    }

    renderDay(day) {
        const dayEl = document.createElement('div');
        dayEl.classList.add('day');
        const daySpanEl = document.createElement('span');
        daySpanEl.textContent = day;
        if (this.isCurrentDay(day, this.month, this.year)) {
            daySpanEl.classList.add('current')
        }
        dayEl.appendChild(daySpanEl);

        return dayEl;
    }

    isCurrentDay(day, month, year) {
        const currentDate = new Date();

        return currentDate.getDate() === day && currentDate.getMonth() + 1 === month && currentDate.getFullYear() === year;
    }

    setMonth(month) {
        this.month = month;
    }

    setYear(year) {
        this.year = year;
    }

    changeMonth(e, context) {
        let targetMonth = e.target.classList.contains('next') ? context.month + 1 : context.month - 1;
        let targetYear = this.year;
        if (targetMonth == 0) {
            targetMonth = 12;
            targetYear = this.year - 1;
        }
        if (targetMonth == 13) {
            targetMonth = 1
            targetYear = this.year + 1;
        }
        this.dispatcher.fire(events['CALENDAR_MONTH_CHANGED'], {'old': context.month, 'new': targetMonth});
        context.setMonth(targetMonth);
        context.setYear(targetYear);
        context.render();
        context.setupEventListeners();
    }

    setupEventListeners() {
        document.querySelectorAll('.month-switch-button').forEach(element => {
            element.addEventListener('click', (e) => this.changeMonth(e, this)); 
        });
    }
}
