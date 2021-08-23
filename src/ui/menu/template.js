export const menuTemplate = `
<nav class="menu">
  <h1>Workout Planner</h1>
  <div class="actions">
  </div>
</nav>
`;

export const addGroupTemplate = `
  <div class="overlay add-group">
    <h2>Add group</h2>
    <div class="rounded-button close-overlay">
      <i class="fas fa-times"></i>
    </div>
    <form>
      <div class="input-wrapper">
        <label for"name">Name</label>
        <input id="name" name="name"/>
      </div>
      <div class="input-wrapper">
        <button class="btn btn-primary" type="submit">Save</button>
      </div>
    </form>
  </div>
`;
