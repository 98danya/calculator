const display = document.getElementById("display");
const digitBtn =  document.querySelectorAll(".digit-btn-container button");
const operatorBtn = document.querySelectorAll(".operator-btn-container button");
const equalsBtn = document.getElementById("equals");
const clearBtn = document.getElementById("clear");


function add(a, b) {
    return a + b;
}

function substract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a/b;
}

function operate(num1, num2, operator) {
    if (operator === "add") {
        return add(num1, num2);
    } else if (operator === "substract") {
        return substract(num1, num2);
    } else if (operator === "multiply") {
        return multiply(num1, num2);
    } else if (operator === "divide") {
        return divide(num1, num2);
    } else {
        return "You didn't choose a valid operator or didn't type two numbers. Try again!"
    }
}

let currentInput = "";
let firstOperand = null;
let operator = null;
let operatorSelected = false;

function updateDisplay(digit) {
    if (operatorSelected) {
        currentInput = "";
        operatorSelected = false;
    }
    currentInput += digit;
    display.value = currentInput;
}

digitBtn.forEach(button => {
    button.addEventListener("click", () => {
        updateDisplay(button.textContent);
    });
});

function selectOperator(op) {
    if (currentInput !== "") {
        if (firstOperand === null) {
            firstOperand = parseFloat(currentInput); 
        } else if (operator && currentInput !== "") {
            const secondOperand = parseFloat(currentInput);
            const result = operate(firstOperand, secondOperand, operator);
            display.value = result;
            firstOperand = result;
        }
        operator = op;
        operatorSelected = true;
    }
}

operatorBtn.forEach(button => {
    button.addEventListener("click", () => {
        if (button.id !== "equals") { 
            selectOperator(button.id);
        }
    });
});

equalsBtn.addEventListener("click", () => {
    if (firstOperand != null && operator && currentInput !== "") {
        const secondOperand = parseFloat(currentInput);
        const result = operate(firstOperand, secondOperand, operator);
        display.value = result;                             
        currentInput = result.toString();                    
        firstOperand = null;                                
        operator = null;                                     
    }
});

clearBtn.addEventListener("click", () => {
    currentInput = "";
    firstOperand = null;
    operator = null;
    display.value = "";
});