export const addGroupTemplate = `
  <div class="overlay add-group">
    <h2>Add group</h2>
    <div class="btn btn-round btn-gray close-overlay">
      <i class="fas fa-times"></i>
    </div>
    <form>
      <div class="input-wrapper">
        <label for"name">Name</label>
        <input id="name" name="name"/>
      </div>
      <div class="input-wrapper">
        <label>Exercises</label>
      </div>
      <div class="exercise-holder"></div>
      <div class="input-wrapper">
        <button type="button" class="btn btn-outline-gray" name="add-exercise">
          <i class="fas fa-plus"></i> Add exercise
        </button>
      </div>
      <div class="input-wrapper">
        <button class="btn btn-primary" type="button" data-submit>Save</button>
      </div>
    </form>
  </div>
`;

export const inputTemplate = `
<div class="input-wrapper">
  <input id="name" name="exercise" placeholder="Exercise"/>
</div>
`;
