

const fromPanel = document.querySelector('.from');
const toPanel = document.querySelector('.to');

const fromInput = fromPanel.querySelector('.calc-input-field');
const toInput = toPanel.querySelector('.calc-input-field');

const fromButtonList = fromPanel.querySelector('.calc-currency');
const toButtonList = toPanel.querySelector('.calc-currency');

const fromRate = fromPanel.querySelector('.calc-input-rate');
const toRate = toPanel.querySelector('.calc-input-rate');

const fromSelector = fromPanel.querySelector('.calc-currency-select');
const toSelector = toPanel.querySelector('.calc-currency-select');

const state = {from: 'RUB', to:'USD', amount:1}

initialApp();

// Получаем данные с сервера с параметрами запроса сразу с возможностью конвертирования:

async function convert(from, to, amount) {
    const response = await fetch(`https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}&places=4`);
    const data = await response.json();
    return [data.result, data.info.rate];
}

function activateButton (button) {
    button.classList.add('active');
}

function disableButton (button) {
    button.classList.remove('active');
}

function getActiveButton (buttonList) {
    return buttonList.querySelector('.active');
}

function getButtonByCurrency (currency, buttonList) {
    return buttonList.querySelector(`.calc-currency-item[value=${currency}]`);
}

function initialApp () {
    activateButton(getButtonByCurrency(state.from, fromButtonList));
    activateButton(getButtonByCurrency(state.to, toButtonList));
}

// const [result, rate] = convert();

// Обработчики событий на инпуты и общий блок с кнопками выбора валют

fromInput.addEventListener('input', async (event) => {
    let rate;
    [toInput.value, rate] = await convert('RUB', 'USD', event.target.value);
})

// fromInput.addEventListener('input', async (event) => {
//     let rate;
//     let currencyFrom = fromButtonList.querySelector('.active');
//     let currencyTo = toButtonList.querySelector('.active');
//     [toInput.value, rate] = await convert(currencyFrom, currencyTo, event.target.value);
// })


toInput.addEventListener('input', async (event) => {
    [fromInput.value] = await convert('USD', 'RUB', event.target.value);
})


// toInput.addEventListener('input', async (event) => {
//     let rate;
//     let currencyFrom = fromButtonList.querySelector('.active');
//     let currencyTo = toButtonList.querySelector('.active');
//     [fromInput.value] = await convert(currencyFrom, currencyTo, event.target.value);
// })


fromButtonList.addEventListener('click', (event) => {
    if (event.target.classList.contains('calc-currency-item')) {
        disableButton(getActiveButton(fromButtonList));
        activateButton(event.target);
    }
})

toButtonList.addEventListener('click', (event) => {
    if (event.target.classList.contains('calc-currency-item')) {
        disableButton(getActiveButton(toButtonList));
        activateButton(event.target);
    }
})

fromButtonList.addEventListener("click", renderResults);
toButtonList.addEventListener("click", renderResults);

toSelector.addEventListener('change', selectorHandler);
fromSelector.addEventListener('change', selectorHandler);


// ----------------------------------------------------------------
function renderResults() {
    let from = fromButtonList.querySelector('.active').value;
    let to = toButtonList.querySelector('.active').value;

    console.log(from);
    console.log(to);

    // let from = fromInput.value;
    // let to = toInput.value;
    let amountToConvert = fromInput.value;
    let result = toInput.value;
    console.log(amountToConvert);

    if (from === to) {
        amountToConvert = result;
        fromRate.innerText = `1 ${from} = 1.0000 ${to}`
        toRate.innerText = `1 ${from} = 1.0000 ${to}`
    } else {

        // async function convert() {
        //     const resp = await fetch(`https://api.exchangerate.host/convert?from=${left}&to=${right}`)
        //     const data = await resp.json()
        //     return data
        // }

        async function convert(from, to, amount) {
            const response = await fetch(`https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amountToConvert}&places=4`);
            const data = await response.json();
            return [data.result, data.info.rate];
        }
        
        convert(from, to, amountToConvert);
        
        // [toInput.value, rate] = await convert(from, to, amountToConvert);

        // convert()
        //     .then((data) => {
        //         let value = (1 / `${data.result}`).toFixed(4)
        //         priceMoneyTo.innerText = `1 ${left} = ${data.result.toFixed(4)} ${data.query.to}`
        //         priceMoneyFrom.innerText = `1 ${data.query.to} = ${value} ${data.query.from}`
        //         inputFrom.value = `${data.result.toFixed(4) * Number(inputTo.value).toFixed(4)}`
        //         let test = Number(inputFrom.value).toFixed(4)
        //         inputFrom.value = test
        //     })
    }
}


// async function convert(from, to, amount) {
//     const response = await fetch(`https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}&places=4`);
//     const data = await response.json();
//     return [data.result, data.info.rate];
// }


// -------------------------------------------------------------------------------------------



// Запрос на получение всех вариантов валют с сервера:
async function getCurrency() {
    const resp = await fetch("https://api.exchangerate.host/latest")
    const data = await resp.json()
    return data;
}

//Получаем данные с сервера
getCurrency()
.then((data)=> {
    const currencyArr = Object.keys(data.rates);
    renderSelect(currencyArr, fromSelector);
    renderSelect(currencyArr, toSelector);
})

// Отрисовываем селекторы по данным с сервера: *https://learn.javascript.ru/form-elements#new-option

function renderSelect(arr, whereToAppend) {
    arr.forEach(element => {
        let option = new Option(`${element}`, `${element}`);
        whereToAppend.append(option);
    });
}


function selectorHandler(event) {
    
}







// function selectorHandler(event) {
//     if (event.target.classList.contains('calc-currency-select')) {
//         disableButton(getActiveButton(toSelector));
//         activateButton(event.target);
//         // let selected = document.querySelector('option');
//         // selected.classList.toggle('active'); 
//     }
// };


// function selectorHandler(event) {
//     if (event.target.value) {
//         let selected = document.querySelector('option');
//         selected.classList.toggle('active'); 
//     }
// };

// Добавляем обоим селекторам обработчики событий по типу change (т.е. на изменение элемента?):
// selector.forEach((item) => {
//     item.addEventListener('change', selectorHandler);
// })

// let button = document.querySelectorAll('.calc-currency-item');

// button.forEach(item => {
//     item.addEventListener('click', markActiveButton);
// })

// Получить rates от доллара к рублю через API: (сначала сделать для пар, которые уже есть в html-ке? потом для тех, которые в Селекте?):
// https://api.exchangerate.host/latest?base=USD&symbols=RUB&amount=${amount}; 
// https://api.exchangerate.host/latest?base=${currencyFrom}&symbols=${currencyTo}&amount=${amount}; 

// let boxFrom;
// let boxTo;
// let currencyFrom;
// let currencyTo;
// let amount;
// let resultValue; // правый инпут с результатом.

// boxFrom = document.querySelector('.from');
// currencyFromBtn = boxFrom.querySelectorAll('.calc-currency-item');
// boxTo = document.querySelector('.to');
// currencyToBtn = boxTo.querySelectorAll('.calc-currency-item');
// amountField = document.querySelector('.calc-input-field');

// currencyFromBtn.forEach(item => {
//     item.addEventListener('click', (event) => {
//         currencyFrom = `${event.target.innerText}`;
//         console.log(currencyFrom);
//     })

//     item.addEventListener('click', (event) => {
//         if (event.target.tagName === "BUTTON") {
//             item.classList.toggle('active');
//         }
//     })
// })


// currencyToBtn.forEach(item => {
//     item.addEventListener('click', (event) => {
//         currencyTo = `${event.target.innerText}`;
//         console.log(currencyTo);
//     })

//     item.addEventListener('click', (event) => {
//         if (event.target.tagName === "BUTTON") {
//             item.classList.toggle('active');
//         }
//     })
// })

// amountField.addEventListener('change', (event) => {
//     amount = `${event.target.value}`;
//     console.log(amount);
// })



// function getConverted(currencyFrom, currencyTo, amount) {
//     fetch(`https://api.exchangerate.host/latest?base=${currencyFrom}&symbols=${currencyTo}&amount=${amount}`)
//         .then(response => response.json())
//         .then(data => {
//             // console.log(data.rates);
//                 displayRes(data);
//         })
// }

// function displayRes(data) {
//     resultValue = document.getElementById('right');

//     for (let key in data.rates) {
//         resultValue.value = data.rates[key];
//     }
  
// }

// getConverted('USD', 'RUB', 2000);

// function getConverted(currencyFrom, currencyTo, amount) {
//     return new Promise((resolve, reject) => {
//         fetch(`https://api.exchangerate.host/latest?base=${currencyFrom}&symbols=${currencyTo}&amount=${amount}`)
//             .then(response => response.json())
//             .then(data => {
//                 console.log(data.rates);
//                 resolve(data);
//             })
//             .catch(error => {
//                 reject(error);
//             })
//     })
// }



// console.log(data.rates);

// const getConverted = async (currencyFrom, currencyTo, amount) => {
//     const response = await fetch(`https://api.exchangerate.host/latest?base=${currencyFrom}&symbols=${currencyTo}&amount=${amount}`);
//     const data = await response.json();
//     return data
// }







