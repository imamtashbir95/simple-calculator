const display = document.querySelector(".display");
const buttons = document.querySelectorAll(".button");
let currentInput = "0";
let previousInput = "";
let operator = null;

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const value = button.textContent;

        if (button.classList.contains("button-clear")) {
            clearDisplay();
        } else if (value === "=") {
            calculate();
        } else if (["+", "-", "*", "/"].includes(value)) {
            setOperator(value);
        } else {
            appendNumber(value);
        }
    });
});

function clearDisplay() {
    currentInput = "0";
    previousInput = "";
    operator = null;
    updateDisplay();
}

function appendNumber(value) {
    if (currentInput === "0" && value !== ".") {
        currentInput = value;
    } else {
        currentInput += value;
    }
    updateDisplay();
}

function setOperator(op) {
    if (currentInput === "" || (operator && previousInput !== "")) {
        calculate();
    }
    operator = op;
    previousInput = currentInput;
    currentInput = "";
}

function calculate() {
    if (operator && previousInput !== "" && currentInput !== "") {
        const num1 = parseFloat(previousInput);
        const num2 = parseFloat(currentInput);
        let result = 0;

        switch (operator) {
            case "+":
                result = num1 + num2;
                break;
            case "-":
                result = num1 - num2;
                break;
            case "*":
                result = num1 * num2;
                break;
            case "/":
                result = num2 !== 0 ? num1 / num2 : "Error";
                break;
        }

        currentInput = result.toString();
        operator = null;
        previousInput = "";
    }
    updateDisplay();
}

function updateDisplay() {
    display.textContent = currentInput || "0";
}
