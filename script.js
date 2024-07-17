document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    const historyList = document.getElementById('history-list');

    let currentInput = '';
    let previousInput = '';
    let operator = null;
    let history = [];

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');

            if (value === 'C') {
                clear();
            } else if (value === '=') {
                calculate();
            } else if (['+', '-', '*', '/'].includes(value)) {
                setOperator(value);
            } else {
                appendNumber(value);
            }
        });
    });

    function clear() {
        currentInput = '';
        previousInput = '';
        operator = null;
        updateDisplay();
    }

    function appendNumber(number) {
        if (number === '.' && currentInput.includes('.')) return;
        currentInput += number;
        updateDisplay();
    }

    function setOperator(op) {
        if (currentInput === '') return;
        if (previousInput !== '') {
            calculate();
        }
        operator = op;
        previousInput = currentInput;
        currentInput = '';
        updateDisplay();
    }

    function calculate() {
        let result;
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);

        if (isNaN(prev) || isNaN(current)) return;

        const currentOperator = operator; 

        switch (operator) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                result = prev / current;
                break;
            default:
                return;
        }

        currentInput = result;
        operator = null;
        previousInput = '';
        updateDisplay();
        addToHistory(`${prev} ${currentOperator} ${current} = ${result}`); 
    }

    function updateDisplay() {
        if (operator != null) {
            display.innerHTML = `${previousInput} ${operator} <br>${currentInput || '0'}`;
        } else {
            display.innerText = currentInput || '0';
        }
    }

    function addToHistory(entry) {
        history.push(entry);
        const li = document.createElement('li');
        li.innerText = entry;
        historyList.appendChild(li);
    }
});
