let operator = "";
let previousValue = "";
let currentValue = "0";

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

  // clear button click & plus/minus button click
  clearBtn.addEventListener("click", function () {
    operatorsList.forEach((op) => op.classList.remove("disabled"));
    currentValue = "";
    previousValue = "";
    operator = "";
    currentDisplay.textContent = 0;
    previousDisplay.textContent = "";
  });

  plusMinusBtn.addEventListener("click", function () {
    currentValue = -currentValue;
    currentDisplay.textContent = currentValue;
  });

  //decimal sign + delete btn
  decimalSymbol.addEventListener("click", handleDecimal);
  function handleDecimal() {
    if (!currentValue.includes(".")) {
      currentValue += ".";
    }
  }
  deleteBtn.addEventListener("click", function () {
    currentValue = currentValue.slice(-1);
    currentDisplay.textContent = currentValue || "0";
  });

  // handle Equal button click
  function calculate() {
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
      operatorsList.forEach((op) => op.classList.add("disabled"));
      previousValue = "Cannot divide by 0";
      currentValue = "";
    } else {
      previousValue = result.toString();
      currentValue = previousValue;
    }
  }
  equalBtn.addEventListener("click", function () {
    if (previousValue !== "" && currentValue !== "") {
      calculate();
      previousDisplay.textContent = "";
      currentDisplay.textContent = previousValue;
    }
  });
});
