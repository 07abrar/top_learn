// ROOT CONTAINER
container = document.querySelector("#container");
if (!container) {
  throw new Error("#container not found");
}

// CALCULATOR STATE
const calculatorState = {
  currentValue: null,
  lastValue: null,
  currentOperation: null,
};

// BUTTON ATTRIBUTES
const keyLayout = {
  firstRow: [
    ["1/x", "mod"],
    ["x^2", "mod"],
    ["sqrt(x)", "mod"],
    ["÷", "op", "/"],
  ],
  secondRow: [
    ["7", "digit"],
    ["8", "digit"],
    ["9", "digit"],
    ["×", "op", "*"],
  ],
  thirdRow: [
    ["4", "digit"],
    ["5", "digit"],
    ["6", "digit"],
    ["−", "op", "-"],
  ],
  fourthRow: [
    ["1", "digit"],
    ["2", "digit"],
    ["3", "digit"],
    ["+", "op"],
  ],
  fifthRow: [
    ["+-", "mod"],
    ["0", "digit"],
    [".", "dot"],
    ["=", "eq"],
  ],
};

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

// UI BUILDERS
function buildDisplay() {
  const display = createElement("div", { className: "display" });
  const displayExpression = createElement("div", { className: "display-expr" });
  const displayValue = createElement("div", { className: "display-value" });
  display.append(displayExpression, displayValue);
  return display;
}

function buildOneRowKeyPad(row, button, label, valueOverride) {
  const value = valueOverride ?? button;
  const btn = createElement("button", {
    className: "btn",
    text: button,
    attrs: {
      "data-value": value,
      "data-label": label,
    },
  });
  row.appendChild(btn);
}

function buildKeyPad() {
  const keyPad = createElement("div", { className: "display" });

  Object.values(keyLayout).forEach((row) => {
    const rowWrapper = createElement("div", { className: "btn-wrapper" });

    row.forEach(([button, label, valueOverride]) => {
      buildOneRowKeyPad(rowWrapper, button, label, valueOverride);
    });

    keyPad.appendChild(rowWrapper);
  });

  return keyPad;
}

// RENDER
function modifyValue(value) {
  const digitValue = parseFloat(calculatorState.currentValue);
  if (value === "1/x") {
    if (calculatorState.currentValue === "0") {
      return "Can't divide by zero!";
    } else {
      return `${1 / digitValue}`;
    }
  } else if (value === "x^2") {
    return `${digitValue ** 2}`;
  } else if (value === "sqrt(x)") {
    return `${Math.sqrt(digitValue)}`;
  } else if (value === "+-") {
    if (digitValue === 0) {
      return "0";
    } else {
      return `${-digitValue}`;
    }
  }
}

function doOperation(firstNumber, secondNumber) {
  const digitFirstNumber = parseFloat(firstNumber);
  const digitSecondNumber = parseFloat(secondNumber);
  if (calculatorState.currentOperation === "+") {
    return `${digitFirstNumber + digitSecondNumber}`;
  } else if (calculatorState.currentOperation === "-") {
    return `${digitFirstNumber - digitSecondNumber}`;
  } else if (calculatorState.currentOperation === "*") {
    return `${digitFirstNumber * digitSecondNumber}`;
  } else if (calculatorState.currentOperation === "/") {
    return `${digitFirstNumber / digitSecondNumber}`;
  }
}

function render() {
  const currentDigit = calculatorState.currentValue;
  currentDisplayValueEl.textContent = currentDigit;

  const dotButton = document.querySelector('button[data-label="dot"]');
  dotButton.disabled = calculatorState.currentValue?.includes(".");
}

// INITIAL BOOTSTRAP
container.append(buildDisplay(), buildKeyPad());
const currentDisplayValueEl = document.querySelector(".display-value");
render();

// GLOBAL EVENT LISTENER
document.addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-label]");
  if (!btn) return;

  const value = btn.dataset.value;
  const label = btn.dataset.label;

  if (label === "digit") {
    if ([null, "0"].includes(calculatorState.currentValue)) {
      calculatorState.currentValue = value;
    } else {
      calculatorState.currentValue += value;
    }
  } else if (label === "mod") {
    calculatorState.currentValue = modifyValue(value);
  } else if (label === "op") {
    calculatorState.lastValue = calculatorState.currentValue;
    calculatorState.currentOperation = value;
    calculatorState.currentValue = null;
  } else if (label === "eq") {
    const firstNumber = calculatorState.lastValue;
    const secondNumber = calculatorState.currentValue;
    calculatorState.currentValue = doOperation(firstNumber, secondNumber);
  } else if (label === "dot") {
    if ([null, "0"].includes(calculatorState.currentValue)) {
      calculatorState.currentValue = "0.";
    } else {
      calculatorState.currentValue += value;
    }
  }
  render();
});
