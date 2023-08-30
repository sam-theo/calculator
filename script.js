document.addEventListener("DOMContentLoaded", function () {
    let array = [];
    let results;
    let lastresults;
    let onlyNumber = true;
    let onlySymbol = false;
    let noDecimal = false;

    document.getElementById(".").addEventListener('click', function () {
        if (!onlySymbol && !isNaN(array[array.length - 1]) && !noDecimal) {
            array.push('.')
            onlyNumber = true;
            noDecimal = true;
            console.log(array);
            showCalc();
        } else if (!onlySymbol && isNaN(array[array.length - 1]) && array[array.length - 1] !== "." && !noDecimal) {
            array.push('0')
            array.push('.')
            onlyNumber = true;
            noDecimal = true;
            console.log(array);
            showCalc();
        }
    });
    document.getElementById("=").addEventListener('click', function () {
        if (!onlyNumber) {
            array = [results];
            onlySymbol = true;
            showCalc();
        }
    });
    document.getElementById("/").addEventListener('click', function () {
        if (!onlyNumber) {
            array.push('/')
            onlyNumber = true;
            noDecimal = false;
            onlySymbol = false;
            console.log(array);
            showCalc();
        }
    });
    document.getElementById("+").addEventListener('click', function () {
        if (!onlyNumber) {
            array.push('+')
            onlyNumber = true;
            noDecimal = false;
            onlySymbol = false;
            console.log(array);
            showCalc();
        }
    });
    document.getElementById("-").addEventListener('click', function () {
        if (!onlyNumber) {
            array.push('-')
            onlyNumber = true;
            noDecimal = false;
            onlySymbol = false;
            console.log(array);
            showCalc();
        }
    });
    document.getElementById("*").addEventListener('click', function () {
        if (!onlyNumber) {
            array.push('*')
            onlyNumber = true;
            noDecimal = false;
            onlySymbol = false;
            console.log(array);
            showCalc();
        }
    });
    let calculation = document.getElementById("calc");
    let screen = document.getElementById("result");
    document.getElementById("clear").addEventListener('click', function () {
        array = [];
        results = '';
        screen.textContent = results;
        showCalc();
    });
    document.getElementById("delete").addEventListener('click', function () {
        array.pop();
        screen.textContent = lastresults;
        showCalc();
    });
    
    





    for (let x = 0; x <= 9; x++) {
        const button = document.getElementById(x);
        if (button) {
            button.addEventListener('click', function () {
                if (!onlySymbol) {
                    array.push(x)
                    console.log(array);
                    onlyNumber = false;
                    lastresults = results;
                    results = calculate(array);
                    screen.textContent = results;
                    showCalc();
                }
            });
        }
    }

    function showCalc(){
        const concatenatedString = array.join('');
        calculation.textContent = concatenatedString;
    }

    function calculate(calcArray) {
        let calculableArray = [];
        if(!hasDecimals(calcArray)){
            console.log('ah')
        calculableArray = calcArray.slice();
        }else{
            calculableArray = removeDecimals(calcArray.slice());
        }
        console.log(calculableArray);
        let simpleArray = [];
        while (calculableArray.length !== 0) {
            let token = calculableArray[0];
            if (!isNaN(token) || token == "+" || token == "-") {
                simpleArray.push(calculableArray.shift());
            } else if (token == "*" || token == "/") {
                let multipleArray = [];
                let lastIndex = simpleArray.length - 1;

                while (simpleArray.length !== 0 && !isNaN(simpleArray[lastIndex])) {
                    multipleArray.push(simpleArray.pop());
                    lastIndex = lastIndex - 1;
                }

                multipleArray.push(calculableArray.shift());

                while (calculableArray.length !== 0 && !isNaN(calculableArray[0])) {
                    multipleArray.push(calculableArray.shift());
                }

                simpleArray.push(calculateEquation(multipleArray));
            }


        }


        if (containsEquation(simpleArray)) {
            return calculateEquation(simpleArray);
        } else {
            const concatenatedString = simpleArray.join('');
            return parseFloat(concatenatedString);
        }
    }

    function calculateEquation(equationArray) {
        let result = 0;
        let operatorFound = 0;
        let smallArray = [];


        equationArray.forEach(token => {
            if (!isNaN(token)) {
                smallArray.push(token);
            } else if ((token == "+" || token == "-" || token == "*" || token == "/") && operatorFound == 0) {
                operatorFound = 1;
                smallArray.push(token);
            } else if ((token == "+" || token == "-" || token == "*" || token == "/") && operatorFound == 1) {
                resultArray = calculateArray(smallArray);
                result = resultArray;
                smallArray = [result, token];
                operatorFound = 1;
            } else {
                console.log("er is een fout opgetreden")
            }

        });

        if (operatorFound == 1) {
            resultArray = calculateArray(smallArray);
            result = resultArray;
            return result;
        } else {
            return result;
        }
    }

    function calculateArray(Array) {
        const operators = {
            '+': (a, b) => parseFloat(a) + parseFloat(b),
            '-': (a, b) => parseFloat(a) - parseFloat(b),
            '*': (a, b) => parseFloat(a) * parseFloat(b),
            '/': (a, b) => parseFloat(a) / parseFloat(b),
        };

        let number1 = "";
        let number2 = "";
        let operator = null;
        Array.forEach(token => {
            if (!isNaN(token) && operator == null) {
                number1 += token;
            } else if (!isNaN(token) && operator !== null) {
                number2 += token;
            } else if (token == "+" || token == "-" || token == "*" || token == "/") {
                operator = token;
            } else {
                console.log("token not recognised")
            }
        });
        const result = operators[operator](number1, number2);
        return result.toFixed(4);

    }

    function containsEquation(eqArray) {
        let res = false;
        eqArray.forEach(token => {
            if (token == "+" || token == "-" || token == "*" || token == "/") {
                res = true;
            }
        });
        return res;
    }

    function hasDecimals(deArray) {
        let res = false;
        deArray.forEach(token => {
            if (token == ".") {
                res = true;
            }
        });
        return res;
    }
    

    function removeDecimals(desArray) {
      
        let newarray = [];
        while (desArray.length !== 0) {
            let token = desArray[0];
            if (!isNaN(token) || token == "+" || token == "-" || token == "*" || token == "/") {
                newarray.push(desArray.shift());
                
            } else {
               
                let numberArray = [];
                let lastIndex = newarray.length - 1;
                while (newarray.length !== 0 && !isNaN(newarray[lastIndex])) {
                    numberArray.push(newarray.pop());
                    lastIndex = lastIndex - 1;
                    
                }

                numberArray.push(desArray.shift());

                while (desArray.length !== 0 && !isNaN(desArray[0])) {
                    numberArray.push(desArray.shift());
                    console.log(5)
                }
                const concatenatedString = numberArray.join('');
                let numb = parseFloat(concatenatedString);
                newarray.push(numb);
            }
        }
        return newarray;
    }






});