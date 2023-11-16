const calculator = document.querySelector('.calculator');
const keys = calculator.querySelector('.calculator-keys');
const display = document.querySelector('.calculator-display');

keys.addEventListener('click', e => {
    if(e.target.matches('button')) {
        const key = e.target;
        const action = key.dataset.action;
        const keyValue = key.textContent;
        const numDisplayed = display.textContent;
        const previousKeyType = calculator.dataset.previousKeyType;

        const calculate = (n, operator, m) => { // calculate function - returns result of type float
            let result = '';

            if (operator === 'add') {
                result = parseFloat(n) + parseFloat(m);
            }
            else if (operator === 'subtract') {
                result = parseFloat(n) - parseFloat(m);
            }
            else if(operator === 'multiply') {
                result = parseFloat(n) * parseFloat(m);
            }
            else if (operator === 'divide') {
                result = parseFloat(n) / parseFloat(m);
            }

            if(Number.isInteger(result)) {
                return result;
            }
            else{
                return result.toFixed(6); // prevents result overflowing in display
            }
            
            
        }
        Array.from(key.parentNode.children).forEach(k => k.classList.remove('is-pressed'),
        )
        if(!action) { 
            if(numDisplayed === '0' || previousKeyType === 'operator') { //  if calculator shows 0, or if last pressed is operator
                display.textContent = keyValue;
            }
            else { // if calculator shows non zero, append new number
                display.textContent = numDisplayed + keyValue;
            }
            calculator.dataset.previousKeyType = 'number';
            console.log('Number Key');
        }

        if(action === 'add' ||
            action === 'subtract' ||
            action === 'multiply' ||
            action === 'divide') {
                key.classList.add('is-pressed');
                calculator.dataset.previousKeyType = 'operator';
                calculator.dataset.firstValue = numDisplayed;
                calculator.dataset.operator = action;

                console.log('Operator Key');
            }
        
        if (action === 'decimal') {
            if(!numDisplayed.includes('.')) {
            display.textContent = numDisplayed + '.';
            }
            else if(previousKeyType === 'operator') {
                display.textContent = '0.';
            }

            calculator.dataset.previousKeyType = 'decimal';
            console.log('decimal key');
        }

        if(action === 'clear') {
            display.textContent = '0';

            calculator.dataset.previousKeyType = 'clear';
            console.log('clear key');
        }

        if(action === 'equals') {
            const firstValue = calculator.dataset.firstValue;
            const operator = calculator.dataset.operator;
            const secondValue = numDisplayed;

            display.textContent = calculate(firstValue,operator,secondValue);
            calculator.dataset.previousKeyType = 'equals';
            console.log('equals key');
        }

       
    }
})