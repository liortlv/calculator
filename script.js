const digitsButtons = document.querySelectorAll(".digit");
const operatorButtons = document.querySelectorAll(".operator");
const display = document.querySelector("#display");
const equalButton = document.querySelector('#equal');
const clearButton = document.querySelector('#clear');
const percentageButton = document.querySelector('#percentage');
let displayValue = '0';
let lastestOperator;
const equation = {
    firstOperand: 0,
    secondOperand: '',
    operator: '',
}

digitsButtons.forEach(digit => {
    digit.addEventListener('click', digitPressed);
});
operatorButtons.forEach(operator => {
    operator.addEventListener('click', operatorPressed);
});
clearButton.addEventListener('click', clearDisplay);
equalButton.addEventListener('click', equalPressed);
percentageButton.addEventListener('click', percentagePressed);

populateDisplay();

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

// resetOperatorColor called when user clicks another operator so previous one resets its color
function resetOperatorColor() {
    lastestOperator.style.setProperty('background-color', '#ff8f1f');
}

// operatorPressed called when the user clicks an operator (*/-+ etc)
function operatorPressed() {
    if (lastestOperator) resetOperatorColor();
    lastestOperator = this;
    this.style.setProperty('background-color', '#0ce0e7');
    if (equation.secondOperand) { // acts like equal button if second operand is true
        equation.firstOperand = operate(equation.operator, equation.firstOperand, equation.secondOperand);
        equation.secondOperand = '';
        displayValue = +parseFloat(equation.firstOperand).toFixed(5);;
    }
    equation.operator = this.getAttribute('data-value');
    populateDisplay();
}

// equalPressed called when the user clicks the "=" sign
function equalPressed() {
    if (lastestOperator) resetOperatorColor();
    if (equation.firstOperand && equation.operator && !equation.secondOperand) { // when just one operand and operator
        equation.secondOperand = equation.firstOperand;
    } else if (!equation.secondOperand) { // when '=' pressed but no operator and just one opreand exits
        return;
    }
    if (equation.operator === '/' && equation.secondOperand == 0) { // when dividing by 0
        displayValue = 'Come on man..';
        populateDisplay();
        equation.firstOperand = 0;
        equation.operator = '';
        equation.secondOperand = '';
        return
    }
    equation.firstOperand = operate(equation.operator, equation.firstOperand, equation.secondOperand);
    equation.operator = '';
    equation.secondOperand = '';
    displayValue = +parseFloat(equation.firstOperand).toFixed(5);
    populateDisplay();
}

// digitPressed called when user clicks a digit (0-9) or dot (.)
function digitPressed() {
    if (lastestOperator) resetOperatorColor();
    let digit = this.getAttribute('data-value');
    if (digit == '.' && displayValue.toString().includes('.')) return; // no more than one '.' in a number
    if (!equation.firstOperand && !equation.operator) { // first operand digit entry
        if (digit == '.') {
            equation.firstOperand += digit;
            displayValue += digit;
        } else {
            equation.firstOperand = digit;
            displayValue = digit;
        }
    } else if (!equation.secondOperand && !equation.operator) { // first operand more digits
        if (digit != 0 || equation.firstOperand != 0) {
            equation.firstOperand += digit;
            displayValue += digit;
        }
    } else if (equation.operator && equation.firstOperand) { // second operand entry
        equation.secondOperand += digit;
        displayValue = equation.secondOperand;
    } else if (!equation.firstOperand && equation.operator) { // for cases when firstOperand=0 followed by operand
        equation.secondOperand = digit;
        displayValue = digit;
    }
    populateDisplay();
}

// percentagePressed called when user clicks the precentage button
function percentagePressed() {
    if (equation.firstOperand && !equation.operator) {
        equation.firstOperand /= 100;
        displayValue = equation.firstOperand;
    } else if (equation.secondOperand) {
        equation.secondOperand /= 100;
        displayValue = equation.secondOperand;
    }
    populateDisplay();
}

// clearDisplay called when user clicks AC button, it clears the calculator display and resets equation properties
function clearDisplay() {
    if (lastestOperator) resetOperatorColor();
    equation.firstOperand = 0;
    equation.operator = '';
    equation.secondOperand = '';
    displayValue = '0';
    populateDisplay();
}