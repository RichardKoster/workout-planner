export class Calendar {
    render(month, year) {
        const calendarEl = this.renderCalendar();
        const days = new Date(year, month-1, 0).getDate();
        const daysArray = [...Array(days).keys()].map(i => i + 1);
        const firstDayOfMonth = new Date(year, month-1, 1);
        const prefixDays = firstDayOfMonth.getUTCDay();

        calendarEl.appendChild(this.renderHeader());

        const daysContainerEl = document.createElement('div');
        daysContainerEl.classList.add('days-container');
        for (let _ of [...Array(prefixDays).keys()].map(i => i + 1)) {
            const prefixEl = document.createElement('div');
            prefixEl.classList.add('day');
            daysContainerEl.appendChild(prefixEl);
        }
        for (let day of daysArray) {
            daysContainerEl.appendChild(this.renderDay(day, month, year));
        }
        calendarEl.appendChild(daysContainerEl);

        return calendarEl;
    }

    renderCalendar() {
        const calendarEl = document.createElement('div');
        calendarEl.classList.add('calendar');

        return calendarEl;
    }

    renderHeader() {
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

    renderDay(day, month, year) {
        const dayEl = document.createElement('div');
        dayEl.classList.add('day');
        const daySpanEl = document.createElement('span');
        daySpanEl.textContent = day;
        if (this.isCurrentDay(day, month, year)) {
            daySpanEl.classList.add('current')
        }
        dayEl.appendChild(daySpanEl);

        return dayEl;
    }

    isCurrentDay(day, month, year) {
        const currentDate = new Date();

        return currentDate.getDate() === day && currentDate.getMonth() + 1 === month && currentDate.getFullYear() === year;
    }
}