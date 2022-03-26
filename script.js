const digitsButtons = document.querySelectorAll(".digit");
const operatorButtons = document.querySelectorAll(".operator");
const display = document.querySelector("#display");
const equalButton = document.querySelector('#equal');
const clearButton = document.querySelector('#clear');
let displayValue = '0';
const equation = {
    firstOperand: 0,
    secondOperand: '',
    operator: '',
}
populateDisplay();

digitsButtons.forEach(digit => {
    digit.addEventListener('click', digitPressed);
});
operatorButtons.forEach(operator => {
    operator.addEventListener('click', operatorPressed);
});
clearButton.addEventListener('click', clearDisplay);
equalButton.addEventListener('click', equalPressed)


// operatorPressed called when the user clicks an operator (*/-+ etc)
function operatorPressed() {
    if (!equation.operator) {
        equation.operator = this.getAttribute('data-value');
        displayValue += equation.operator;
    } else if (equation.secondOperand) {
        equation.firstOperand = operate(equation.operator, equation.firstOperand, equation.secondOperand);
        equation.operator = this.getAttribute('data-value');
        equation.secondOperand = '';
        displayValue = equation.firstOperand + equation.operator;
    }
    populateDisplay();
}

// equalPressed called when the user clicks the "=" sign
function equalPressed() {
    if (equation.firstOperand && equation.operator && !equation.secondOperand) {
        equation.secondOperand = equation.firstOperand;
    } else if (!equation.secondOperand) {
        return;
    }
    if (equation.operator === '/' && equation.secondOperand == 0) { // when dividing 0
        displayValue = 'Come on man..';
        populateDisplay();
        console.log(equation);
        equation.firstOperand = 0;
        equation.operator = '';
        equation.secondOperand = '';
        return
    }   
    equation.firstOperand = operate(equation.operator, equation.firstOperand, equation.secondOperand);
    equation.operator = '';
    equation.secondOperand = '';
    displayValue = +parseFloat(equation.firstOperand).toFixed(7);
    populateDisplay();
}

// digitPressed called when user clicks a digit (0-9)
function digitPressed() {
    let digit = this.getAttribute('data-value');
    if (!equation.firstOperand && !equation.operator) {
        equation.firstOperand = digit;
        displayValue = digit;
    } else if (!equation.secondOperand && !equation.operator) {
        if (digit != 0) {
            equation.firstOperand += digit;
            displayValue += digit;
        }
    } else if (equation.operator && equation.firstOperand) {
        equation.secondOperand += digit;
        displayValue += digit;
    } else if (!equation.firstOperand && equation.operator) { // for cases when firstOperand=0 followed by operand
        equation.secondOperand = digit;
        displayValue += digit;
    }
    populateDisplay();
}

function clearDisplay() {
    equation.firstOperand = 0;
    equation.operator = '';
    equation.secondOperand = '';
    displayValue = '0';
    populateDisplay();
}

function populateDisplay() {
    display.textContent = displayValue;
}

function add(a, b) {
    return +a + +b;
}

function subtract(a, b) {
    return +a - +b;
}

function multiply(a, b) {
    return +a * +b;
}

function divide(a, b) {
    return +a / +b;
}

function operate(operator, a, b) {
    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
    }
}