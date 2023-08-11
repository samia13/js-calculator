document.addEventListener("DOMContentLoaded", function () {
  let historyDiv = document.querySelector(".history");
  let operationsList = document.querySelector(".history ul");

  let numbersList = document.querySelectorAll(".number");
  let operatorsList = document.querySelectorAll(".operator");

  let previousDisplay = document.querySelector(".previous");
  let currentDisplay = document.querySelector(".current");

  let clearBtn = document.querySelector(".clear");
  let equalBtn = document.querySelector(".equal");
  let decimalSymbol = document.querySelector(".decimal");
  let plusMinusBtn = document.querySelector(".plus-minus");
  let deleteBtn = document.querySelector(".delete");
  let percentBtn = document.querySelector(".percentBtn");
  let sqrtBtn = document.querySelector(".sqrtBtn");
  let powBtn = document.querySelector(".powBtn");
  let fractionBtn = document.querySelector(".fractionBtn");
  let toggleHistorybtn = document.querySelector(".toggleHistory i");

  let operator = "";
  let previousValue = "";
  let currentValue = "";

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
    if (currentValue.length < 10) {
      currentValue += number;
      updateScreen();
    }
  }

  // handle operators click event
  function handleOperator(op) {
    if (previousValue && currentValue && operator) {
      calculate();
    }
    if (currentValue) {
      operator = op;
      previousValue = currentValue;
      currentValue = "";
    } else if (previousValue) {
      operator = op;
    }
    updateScreen(`${previousValue} ${operator}`);
  }

  function handleDecimal() {
    if (!currentValue.includes(".")) {
      currentValue += ".";
    }
    updateScreen();
  }

  function resetValues() {
    currentValue = "";
    previousValue = "";
    operator = "";
    currentDisplay.textContent = "";
    previousDisplay.textContent = "";
  }

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
        updateScreen(previousValue);
      } else {
        let roundedNumber = roundNumber(result);
        saveSingleOperation(
          previousValue,
          operator,
          currentValue,
          roundedNumber
        );
        updateScreen(
          `${previousValue} ${operator} ${currentValue}`,
          roundedNumber.toString()
        );
        previousValue = roundedNumber.toString();
        currentValue = "";
        operator = "";
      }
    }
  }

  function roundNumber(number) {
    if (+number % 1 !== 0) {
      return parseFloat(number.toFixed(4));
    }
    return number;
  }

  // update display
  function updateScreen(previous, current) {
    if (previous) previousDisplay.textContent = previous;
    currentDisplay.textContent = current || currentValue;
  }

  function disableOperators(disabled) {
    operatorsList.forEach((op) =>
      disabled ? op.classList.add("disabled") : op.classList.remove("disabled")
    );
  }

  // save operation in history div
  function saveSingleOperation(num1, op, num2, result) {
    const li = document.createElement("li");
    li.innerHTML = `${num1} ${op} ${num2} =<br/> <strong> ${result}</strong>`;
    li.addEventListener("click", () => handleListClick(num1, op, result, num2));
    operationsList.append(li);
  }

  function handleListClick(num1, op, result, num2) {
    previousDisplay.textContent = num1 + " " + op + " " + num2;
    currentDisplay.textContent = result;
    previousValue = result;
    toggleHistory();
  }

  function toggleHistory() {
    let numberOfLiElements = operationsList.querySelectorAll("li").length;
    if (numberOfLiElements)
      document.querySelector(".emptyList").style.display = "none";

    historyDiv.classList.toggle("open");
  }

  currentDisplay.textContent = currentValue;

  numbersList.forEach((number) =>
    number.addEventListener("click", () => handleNumber(number.textContent))
  );

  operatorsList.forEach((op) =>
    op.addEventListener("click", () => handleOperator(op.textContent))
  );

  // decimal & delete btn
  decimalSymbol.addEventListener("click", handleDecimal);

  deleteBtn.addEventListener("click", function () {
    if (currentValue) {
      currentValue = currentValue.slice(0, -1);
      updateScreen("", currentValue || "0");
    }
  });

  // handle Clear btn click & plus/minus btn click
  clearBtn.addEventListener("click", function () {
    disableOperators(false);
    resetValues();
  });

  plusMinusBtn.addEventListener("click", function () {
    if (currentValue) {
      currentValue = -currentValue;
      updateScreen();
    }
  });

  // handle x% button
  percentBtn.addEventListener("click", function () {
    if (currentValue && previousValue) {
      currentValue = Number(currentValue) / 100;
      updateScreen();
    }
  });
  //  handle sqrt(x) button
  sqrtBtn.addEventListener("click", function () {
    if (currentValue) {
      currentValue = roundNumber(Math.sqrt(+currentValue));
      updateScreen();
    }
  });
  // handle sqr(x) button
  powBtn.addEventListener("click", function () {
    if (currentValue) {
      currentValue = roundNumber(Math.pow(+currentValue, 2));
      updateScreen();
    }
  });
  // handle 1/x button
  fractionBtn.addEventListener("click", function () {
    if (currentValue) {
      currentValue = roundNumber(1 / +currentValue);
      updateScreen();
    }
  });

  equalBtn.addEventListener("click", calculate);

  // Keyboard support
  document.addEventListener("keydown", (event) => {
    const key = event.key;

    // add hover effect to clicked key
    if (/[\d\+\-\*\/.]/.test(key)) {
      document.querySelector(`[value="${key}"]`).classList.add("hovered");
    }

    if (/[\+\-\*\/]/.test(key)) {
      handleOperator(key);
    } else if (/[\d]/.test(key)) {
      handleNumber(key);
    } else if (key === "Enter" || key === "Return") {
      event.preventDefault();
      calculate();
    } else if (key === "Escape") {
      resetValues();
    } else if (key === ".") {
      handleDecimal();
    }
  });
  document.addEventListener("keyup", ({ key }) => {
    if (/[\d\+\-\*\/.]/.test(key)) {
      document.querySelector(`[value="${key}"]`).classList.remove("hovered");
    }
  });

  toggleHistorybtn.addEventListener("click", toggleHistory);
});
