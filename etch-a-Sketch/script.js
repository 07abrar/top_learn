// ROOT CONTAINER
container = document.querySelector("#container");
if (!container) {
  throw new Error("container not found.");
}

// DOM HELPER
function createElement(tag, { className, text, id, attrs } = {}) {
  const el = document.createElement(tag);

  if (className) el.className = className;
  if (text) el.textContent = text;
  if (id) el.id = id;
  if (attrs) {
    Object.entries(attrs).forEach(([key, value]) => {
      el.setAttribute(key, value);
    });
  }

  return el;
}

function createInputField(id, { type, placeholder }) {
  return createElement("input", { id, attrs: { type, placeholder } });
}

// UI BUILDERS
function buildTitle() {
  const wrapper = createElement("div", { className: "web-title" });
  const title = createElement("h1", { text: "ETCH A SKETCH" });
  wrapper.appendChild(title);
  return wrapper;
}

function buildGridSizeInputField() {
  const wrapper = createElement("div", {
    className: "grid-size-input-wrapper",
  });
  const inputField = createInputField("grid-size-input", {
    type: "number",
    placeholder: "Enter grid size",
  });
  wrapper.appendChild(inputField);
  return wrapper;
}

function buildTopBarOptions() {
  const wrapper = createElement("div", {
    className: "top-button-wrapper",
  });
  const generateButton = createElement("button", {
    id: "generate-button",
    text: "GENERATE",
  });
  const clearButton = createElement("button", {
    id: "clear-button",
    text: "CLEAR",
  });
  wrapper.append(generateButton, clearButton);
  return wrapper;
}

function buildTopBar() {
  const wrapper = createElement("div", { className: "top-bar" });
  wrapper.append(buildGridSizeInputField(), buildTopBarOptions());
  return wrapper;
}

function buildColorPicker() {
  const wrapper = createElement("div", {
    className: "color-picker",
  });
  const red = createInputField("red-color", {
    type: "number",
    placeholder: "0-255",
  });
  const green = createInputField("red-color", {
    type: "number",
    placeholder: "0-255",
  });
  const blue = createInputField("red-color", {
    type: "number",
    placeholder: "0-255",
  });
  wrapper.append(red, green, blue);
  return wrapper;
}

function buildSideBarOptions() {
  const wrapper = createElement("div", {
    className: "side-button-wrapper",
  });
  const eraserButton = createElement("button", {
    id: "eraser",
    text: "ERASE",
  });
  wrapper.append(eraserButton, buildColorPicker());
  return wrapper;
}

function buildDrawingBoard() {
  const wrapper = createElement("div", {
    className: "drawing-board",
  });
  const gridNum = 50;
  for (let i = 0; i < gridNum; i++) {
    const gridI = createElement("div", {
      className: "grid-i",
    });
    for (let j = 0; j < gridNum; j++) {
      const gridJ = createElement("div", {
        className: "grid-j",
      });
      const size = 750 / gridNum;
      gridJ.style.width = `${size}px`;
      gridJ.style.height = `${size}px`;
      gridI.append(gridJ);
    }
    wrapper.append(gridI);
  }
  return wrapper;
}

function buildDrawerWrapper() {
  const wrapper = createElement("div", { className: "drawer-wrapper" });
  wrapper.append(buildSideBarOptions(), buildDrawingBoard());
  return wrapper;
}

// INITIAL BOOTSTRAP
container.append(buildTitle(), buildTopBar(), buildDrawerWrapper());
