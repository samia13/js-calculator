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
});

//decimal sign

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
