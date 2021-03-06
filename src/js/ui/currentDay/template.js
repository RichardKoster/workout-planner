export const currentDayTemplate = `
<div class="current-day">
  <div class="header">
    <div class="day-line"></div>
  </div>
  <div class="day-planning"></div>
  <div id="add-item" class="btn btn-outline-gray btn-block">
    <i class="fas fa-plus"></i> Add items
  </div>
  <template id="planning-group-template">
    <div class="card">
      <div class="card-header">
        <span data-group-name class="card-title"></span>
      </div>
      <div data-item-container></div>
    </div>
  </template>
  <template id="planning-item-template">
    <div class="planning-item">
      <p data-name></p>
    </div>
  </template>
</div>
`;

export const addItemsModal = `
<div class="modal-overlay">
  <div class="modal add-items">
    <h3>Choose group</h3>
    <strong>Select a group you want to add</strong>
    <div class="select">
      <select id="items">
      </select>
    </div>
    <div class="button-row">
      <button type="button" class="btn btn-outline-gray" data-cancel>
        Cancel
      </button>
      <button type="button" class="btn btn-primary" data-submit>
        Add
      </button>
    </div>
  </div>
</div>
`;
