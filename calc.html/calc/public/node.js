

const screen = document.querySelector('.screen input');
const buttons = document.querySelectorAll('button');
let currentNumber = '';
let previousNumber = '';
let currentOperation = null;
let shouldClearScreen = false;
const resetCalculator = () => {
  currentNumber = '';
  previousNumber = '';
  currentOperation = null;
  shouldClearScreen = false;
  screen.value = '';
};

const updateScreen = (value) => {
  screen.value = value;
};

const handleNumberInput = (number) => {
  if (shouldClearScreen) {
    currentNumber = '';
    shouldClearScreen = false;
  }
  currentNumber += number;
  updateScreen(currentNumber);
};

const handleOperationInput = (operation) => {
  if (currentOperation !== null) {
    handleEqualsInput();
  }
  previousNumber = currentNumber;
  currentNumber = '';
  currentOperation = operation;
};

const handleEqualsInput = () => {
  if (currentOperation === null) {
    return;
  }
  let result;
  switch (currentOperation) {
    case '+':
      result = Number(previousNumber) + Number(currentNumber);
      break;
    case '-':
      result = Number(previousNumber) - Number(currentNumber);
      break;
    case '*':
      result = Number(previousNumber) * Number(currentNumber);
      break;
    case '/':
      result = Number(previousNumber) / Number(currentNumber);
      break;
    default:
      return;
  }
  currentNumber = result.toString();
  currentOperation = null;
  updateScreen(currentNumber);
  shouldClearScreen = true;
};

const handleClearInput = () => {
  resetCalculator();
};

const handleToggleSignInput = () => {
  currentNumber = (-1 * Number(currentNumber)).toString();
  updateScreen(currentNumber);
};

const handlePercentInput = () => {
  currentNumber = (Number(currentNumber) / 100).toString();
  updateScreen(currentNumber);
};
buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;
    switch (value) {
      case 'AC':
        handleClearInput();
        break;
      case '+/-':
        handleToggleSignInput();
        break;
      case '%':
        handlePercentInput();
        break;
      case '+':
      case '-':
      case '*':
      case '/':
        handleOperationInput(value);
        break;
      case '=':
        handleEqualsInput();
        break;
      default:
        handleNumberInput(value);
        break;
    }
  });
});
