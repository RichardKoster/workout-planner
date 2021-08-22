export const calenderTemplate = `
<div class="calendar">
  <div class="month-selector-container">
    <div class="prev month-switch-button">
      <i class="fas fa-angle-left" aria-hidden="true"></i>
    </div>
    <div class="month-holder">
      <div>
        <span id="month">August</span>
        <span id="year">2021</span>
      </div>
    </div>
    <div class="next month-switch-button">
      <i class="fas fa-angle-right" aria-hidden="true"></i>
    </div>
  </div>
  <div class="header-container"></div>
  <div class="days-container"></div>
  <template id="prefix-day-template">
    <div class="day prefix">
      <span></span>
    </div>
  </template>
  <template id="day-template">
    <div class="day day-number">
      <span class="number"></span>
    </div>
  </template>
</div>
`;
