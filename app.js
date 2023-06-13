class Calculator {
   constructor(previousTextElement, currentTextElement) {
      this.previousTextElement = previousTextElement
      this.currentTextElement = currentTextElement
      this.clear();
   }
   clear() {
      this.currentOperand = ''
      this.previousOperand = ''
      this.operation = undefined
   }
   delete() {
      this.currentOperand = this.currentOperand.toString().splice(0, -1);
   }
   appendNumber(number) {
      if (this.currentOperand.includes('.') && number === '.') return
      this.currentOperand = this.currentOperand.toString() + number.toString()
   }

   chooseOperation(operation) {
      if (this.operation != undefined) {
         this.compute();
      }
      this.operation = operation
      this.previousOperand = this.currentOperand
      this.currentOperand = '';
   }

   compute() {
      let computating
      const prev = parseFloat(this.previousOperand)
      const curr = parseFloat(this.currentOperand)
      if (this.operation == undefined || isNaN(prev) || isNaN(curr)) return
      switch (this.operation) {
         case 'x':
            computating = prev * curr
            break;
         case '÷':
            computating = prev / curr
            break;
         case '+':
            computating = prev + curr
            break;
         case '-':
            computating = prev - curr
            break;
         default:
            return
            break;
      }
      this.currentOperand = computating
      this.operation = undefined
      this.previousOperand = ''
   }

   updateDisplay() {
      this.currentTextElement.innerText = this.currentOperand;
      if (this.operation != undefined) {
         this.previousTextElement.innerText = `${this.previousOperand} ${this.operation}`
      } else {
         this.previousTextElement.innerText = ''
      }
   }
   getDisplaynumber(number) {
      const stringNumber = number.toString()
      const integerDigits = parseFloat(stringNumber.split('.')[0])
      const decimalDigits = parseFloat(stringNumber.split('.')[1])
      let integerDisplay
      if (isNaN(integerDigits)) {
         integerDisplay = '';
      } else {
         integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits })
      }
      if (decimalDigits != null) {
         return `${integerDigits}.${decimalDigits}`
      }
      return integerDisplay
   }
}

const previousElement = document.querySelector('.previous-operand')
const currentElement = document.querySelector('.current-operand')
const numbersButton = document.querySelectorAll('[data-number]')
const operationsButton = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const clearButton = document.querySelector('[data-clear]')
const deleteButton = document.querySelector('[data-delete]')
const calculator = new Calculator(previousElement, currentElement)

numbersButton.forEach(element => {
   element.addEventListener('click', function () {
      calculator.appendNumber(element.innerText)
      calculator.updateDisplay()
   })
})

operationsButton.forEach(element => {
   element.addEventListener('click', function () {
      calculator.chooseOperation(element.innerText)
      calculator.updateDisplay()
   })
})

clearButton.addEventListener('click', function () {
   calculator.clear()
   calculator.updateDisplay()
})
deleteButton.addEventListener('click', function () {
   calculator.delete()
   calculator.updateDisplay()
})
equalsButton.addEventListener('click', function () {
   calculator.compute()
   calculator.updateDisplay()
})