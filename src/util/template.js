export const createTemplate = (templateString) => {
  const templateEl = document.createElement("template");
  templateEl.innerHTML = templateString;

  return templateEl;
};
