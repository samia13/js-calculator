document.addEventListener("DOMContentLoaded", function () {
  let clearBtn = document.querySelector(".clear");
  let equalBtn = document.querySelector(".equal");
  let decimalSymbol = document.querySelector(".decimal");
  let plusMinusBtn = document.querySelector(".plus-minus");
  let deleteBtn = document.querySelector(".delete");

  let numbersList = document.querySelectorAll(".number");
  let operatorsList = document.querySelectorAll(".operator");

  let previousDisplay = document.querySelector(".previous");
  let currentDisplay = document.querySelector(".current");

  let percentBtn = document.querySelector(".percentBtn");
  let sqrtBtn = document.querySelector(".sqrtBtn");
  let powBtn = document.querySelector(".powBtn");
  let fractionBtn = document.querySelector(".fractionBtn");

  let operator = "";
  let previousValue = "";
  let currentValue = "";
  let operationsHistory = [];

  currentDisplay.textContent = currentValue;

  function add(a, b) {
    return a + b;
  }

  function subtract(a, b) {
    return a - b;
  }

  function multiply(a, b) {
    return a * b;
  }

  function divide(a, b) {
    if (b === 0) {
      return NaN;
    }
    return a / b;
  }

  //   handle numbers click event
  function handleNumber(number) {
    currentValue += number;
    currentDisplay.textContent = currentValue;
  }

  numbersList.forEach((number) =>
    number.addEventListener("click", () => handleNumber(number.textContent))
  );

  // handle operators click event
  function handleOperator(op) {
    if (previousValue && currentValue) {
      calculate();
    }
    if (currentValue) {
      operator = op;
      previousValue = currentValue;
      currentValue = "";
    } else if (previousValue) {
      operator = op;
    }
    // populate screen
    previousDisplay.textContent = previousValue + " " + operator;
    currentDisplay.textContent = currentValue;
  }

  operatorsList.forEach((op) =>
    op.addEventListener("click", () => handleOperator(op.textContent))
  );

  // decimal & delete btn
  decimalSymbol.addEventListener("click", handleDecimal);
  function handleDecimal() {
    if (!currentValue.includes(".")) {
      currentValue += ".";
    }
    currentDisplay.textContent = currentValue;
  }
  deleteBtn.addEventListener("click", function () {
    if (currentValue) {
      currentValue = currentValue.slice(0, -1);
      currentDisplay.textContent = currentValue || "0";
    }
  });

  // handle Clear btn click & plus/minus btn click
  clearBtn.addEventListener("click", function () {
    disableOperators(false);
    resetValues();
  });

  function resetValues() {
    currentValue = "";
    previousValue = "";
    operator = "";
    currentDisplay.textContent = 0;
    previousDisplay.textContent = "";
  }

  plusMinusBtn.addEventListener("click", function () {
    if (currentValue) {
      currentValue = -currentValue;
      currentDisplay.textContent = currentValue;
    }
  });

  // handle x% button
  percentBtn.addEventListener("click", function () {
    if (currentValue && previousValue) {
      currentValue = ((Number(currentValue) / 100) * previousValue).toFixed(2);
      currentDisplay.textContent = currentValue;
    }
  });
  //  handle sqrt(x) button
  sqrtBtn.addEventListener("click", function () {
    if (currentValue) {
      currentValue = Math.sqrt(+currentValue);
      currentDisplay.textContent = currentValue;
    }
  });
  // handle sqr(x) button
  powBtn.addEventListener("click", function () {
    if (currentValue) {
      currentValue = Math.pow(+currentValue, 2);
      currentDisplay.textContent = currentValue;
    }
  });
  // handle 1/x button
  fractionBtn.addEventListener("click", function () {
    if (currentValue) {
      currentValue = 1 / +currentValue;
      currentDisplay.textContent = currentValue;
    }
  });
  // handle Equal button click
  function calculate() {
    if (previousValue !== "" && currentValue !== "") {
      previousValue = Number(previousValue);
      currentValue = Number(currentValue);

      switch (operator) {
        case "+":
          result = add(previousValue, currentValue);
          break;
        case "-":
          result = subtract(previousValue, currentValue);
          break;
        case "*":
          result = multiply(previousValue, currentValue);
          break;
        case "/":
          result = divide(previousValue, currentValue);
          break;
        default:
          alert(`Invalid Operator ${operator}`);
          return false;
      }
      if (isNaN(result)) {
        disableOperators(true);
        previousValue = "Cannot divide by 0";
        currentValue = "";
      } else {
        previousDisplay.textContent = `${previousValue} ${operator} ${currentValue}`;
        currentDisplay.textContent = result.toString();
        previousValue = result.toString();
        currentValue = "";
        operator = "";
      }
    }
  }
  equalBtn.addEventListener("click", calculate);

  function disableOperators(disabled) {
    operatorsList.forEach((op) =>
      disabled ? op.classList.add("disabled") : op.classList.remove("disabled")
    );
  }
  // Keyboard support
  document.addEventListener("keydown", (event) => {
    const key = event.key;
    document.querySelector(`[value="${key}"]`).classList.add("hovered");
    if (/[\+\-\*\/]/.test(key)) {
      handleOperator(key);
    } else if (/[\d]/.test(key)) {
      handleNumber(key);
    } else if (key === "Enter") {
      calculate();
    } else if (key === "Escape") {
      resetValues();
    } else if (key === ".") {
      handleDecimal();
    }
  });
  document.addEventListener("keyup", ({ key }) => {
    document.querySelector(`[value="${key}"]`).classList.remove("hovered");
  });
});
