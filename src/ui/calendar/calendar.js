import { CALENDAR_MONTH_CHANGED } from '@app/events/events';
import { Dispatcher } from '@app/events/dispatcher';
import { calendar } from '@app/state';
import { MONTHS } from '@app/const';
export class Calendar {

    constructor() {
        this.dispatcher = new Dispatcher(); 
    }

    setup() {
        calendar.element.classList.add('calendar');
        calendar.monthContainer = this.renderMonthSelector();
        calendar.element.appendChild(calendar.monthContainer);
        calendar.element.appendChild(this.renderDaysHeader());
        calendar.daysContainer = this.renderDaysContainer();
        calendar.element.appendChild(calendar.daysContainer);

        this.addListeners();
    }

    render() {
        while (calendar.daysContainer.firstChild) {
            calendar.daysContainer.removeChild(
                calendar.daysContainer.firstChild
            );
        }
        calendar.monthContainer.querySelector('#month').textContent = MONTHS[calendar.date.month];
        calendar.monthContainer.querySelector('#year').textContent = calendar.date.year;
        for (let _ of [...Array(this.getPrefixDays()).keys()].map(i => i + 1)) {
            const prefixEl = document.createElement('div');
            prefixEl.classList.add('day');
            calendar.daysContainer.appendChild(prefixEl);
        }
        for (let day of this.getDays()) {
            calendar.daysContainer.appendChild(this.renderDay(day));
        }
    }

    renderMonthSelector() {
        const selectedMonthName = MONTHS[calendar.date.month];
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
        monthContainer.innerHTML = `<div><span id="month">${selectedMonthName}</span><span id="year">${calendar.date.year}</span></div>`;

        containerEl.appendChild(prevButtonEl);
        containerEl.appendChild(monthContainer);
        containerEl.appendChild(nextButtonEl);

        return containerEl;
    }

    getDays() {
        const days = new Date(calendar.date.year, calendar.date.month, 0).getDate();

        return [...Array(days).keys()].map(i => i + 1);
    }

    getPrefixDays() {
        const firstDayOfMonth = new Date(calendar.date.year, calendar.date.month-1, 1);

        return firstDayOfMonth.getUTCDay();
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
        if (this.isCurrentDay(day, calendar.date.month, calendar.date.year)) {
            daySpanEl.classList.add('current');
            daySpanEl.classList.add('selected');
        }
        dayEl.appendChild(daySpanEl);

        return dayEl;
    }

    isCurrentDay(day, month, year) {
        const currentDate = new Date();

        return currentDate.getDate() === day && currentDate.getMonth() + 1 === month && currentDate.getFullYear() === year;
    }

    changeMonth(e) {
        let targetMonth = e.target.classList.contains('next') ? calendar.date.month + 1 : calendar.date.month - 1;
        let targetYear = calendar.date.year;
        if (targetMonth == 0) {
            targetMonth = 12;
            targetYear = calendar.date.year - 1;
        }
        if (targetMonth == 13) {
            targetMonth = 1
            targetYear = calendar.date.year + 1;
        }
        this.dispatcher.fire(CALENDAR_MONTH_CHANGED, {'old': calendar.date.month, 'new': targetMonth});
        calendar.date.month = targetMonth;
        calendar.date.year = targetYear;
        this.render();
    }

    addListeners() {
        const monthButtons = document.querySelectorAll('.month-switch-button');
        for (const button of monthButtons) {
            button.addEventListener('click', (e) => this.changeMonth(e));
        }
    }
}
