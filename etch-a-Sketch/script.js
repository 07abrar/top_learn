// ROOT CONTAINER
container = document.querySelector("#container");
if (!container) {
  throw new Error("container not found.");
}

// DRAWING STATES
let currentColor = "rgb(0, 0, 0)";
let isDrawing = false;
let isEraserButtonPressed = false;
let lastHoverCell = null;

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
  const green = createInputField("green-color", {
    type: "number",
    placeholder: "0-255",
  });
  const blue = createInputField("blue-color", {
    type: "number",
    placeholder: "0-255",
  });
  [red, green, blue].forEach((color) =>
    color.addEventListener("input", updateCurrentColor)
  );
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
  eraserButton.addEventListener("click", (e) => {
    isEraserButtonPressed = !isEraserButtonPressed;
    eraserButton.classList.toggle("active", isEraserButtonPressed);
  });

  wrapper.append(eraserButton, buildColorPicker());
  return wrapper;
}

function buildDrawingBoard(gridNum = 50) {
  const wrapper = createElement("div", {
    className: "drawing-board",
  });
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

// DRAWING STATE
function updateCurrentColor() {
  const red = document.getElementById("red-color").value || 0;
  const green = document.getElementById("green-color").value || 0;
  const blue = document.getElementById("blue-color").value || 0;
  currentColor = `rgb(${red}, ${green}, ${blue})`;
}

// eventListener for drawing in drawing-board
document.addEventListener("mousedown", (e) => {
  if (!e.target.classList.contains("grid-j")) return;
  isDrawing = true;
  drawCell(e.target);
});

// Tiny timing/movement differences can be considered as drag and drop by the browser
// Add a guard to prevent this behaviour
document.addEventListener("dragstart", (e) => {
  if (e.target.closest?.(".drawing-board")) e.preventDefault();
});

document.addEventListener("mousemove", (e) => {
  if (!e.target.classList.contains("grid-j")) return;
  if (isDrawing) {
    drawCell(e.target);
  } else {
    hoverCell(e.target);
  }
});

function drawCell(cell) {
  clearHover();
  if (isDrawing && !isEraserButtonPressed) {
    cell.style.backgroundColor = currentColor;
  } else if (isDrawing && isEraserButtonPressed) {
    cell.style.backgroundColor = "";
  }
}

function hoverCell(cell) {
  if (lastHoverCell === cell) return;
  clearHover();

  cell.dataset.prevBg = cell.style.backgroundColor || "";
  cell.style.backgroundColor = currentColor;
  cell.style.opacity = "0.15";

  lastHoverCell = cell;
}

function clearHover() {
  if (!lastHoverCell) return;

  lastHoverCell.style.backgroundColor = lastHoverCell.dataset.prevBg;
  lastHoverCell.style.opacity = "";
  delete lastHoverCell.dataset.prevBg;
  lastHoverCell = null;
}

document.addEventListener("mouseup", () => {
  clearHover();
  isDrawing = false;
});

// INITIAL BOOTSTRAP
container.append(buildTitle(), buildTopBar(), buildDrawerWrapper());
