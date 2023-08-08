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
});
