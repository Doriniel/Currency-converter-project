
// https://api.exchangerate.host/latest?base=USD&symbols=RUB 


const fromPanel = document.querySelector('.from');
const toPanel = document.querySelector('.to');

const fromInput = fromPanel.querySelector('.calc-input-field');
const toInput = toPanel.querySelector('.calc-input-field');

const fromButtonList = fromPanel.querySelector('.calc-currency');
const toButtonList = toPanel.querySelector('.calc-currency');

const fromRate = fromPanel.querySelector('.calc-input-rate');
const toRate = toPanel.querySelector('.calc-input-rate');

const state = {from: 'RUB', to:'USD', amount:1}

initialApp();

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

fromInput.addEventListener('input', async (event) => {
    let rate;
    [toInput.value, rate] = await convert('RUB', 'USD', event.target.value);
})

toInput.addEventListener('input', async (event) => {
    [fromInput.value] = await convert('USD', 'RUB', event.target.value);
})

fromButtonList.addEventListener('click', (event) => {
    if (event.target.classList.contains('calc-currency-item')) {
        disableButton(getActiveButton(fromButtonList));
        activateButton(event.target);
    }
})






let selector = document.querySelectorAll('.calc-currency-select');
// let button = document.querySelectorAll('.calc-currency-item');

// button.forEach(item => {
//     item.addEventListener('click', markActiveButton);
// })


// Получить rates от доллара к рублю через API: (сначала сделать для пар, которые уже есть в html-ке? потом для тех, которые в Селекте?):
// https://api.exchangerate.host/latest?base=USD&symbols=RUB&amount=${amount}; 
// https://api.exchangerate.host/latest?base=${currencyFrom}&symbols=${currencyTo}&amount=${amount}; 

let boxFrom;
let boxTo;
let currencyFrom;
let currencyTo;
let amount;
let resultValue; // правый инпут с результатом.

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

// ____________________________________________________________________________________________//


// Добавляем обоим селекторам обработчики событий по типу change (т.е. на изменение элемента?):
// selector.forEach((item) => {
//     item.addEventListener('change', selectorHandler);
// })

// function selectorHandler(event) {
//     if (event.target.value) {
//         let selected = document.querySelector('option');
//         selected.classList.toggle('active');
//         // this.classList.toggle('active');
//     }
//     // selector.options[selector.selectedIndex].value); - так не работает.
// };

// // 

// getCurrency();
// let currencyArr = [];
// function getCurrency() {
//     fetch('https://api.exchangerate.host/latest')
//         .then(response => response.json())
//         .then(data => {
//             currencyArr = Object.keys(data.rates);
//             currencyArr.forEach(item => {
//                 renderSelect(item);
//             })
//         })
// }

// // Отрисовка опций внутри селекторов:

// function renderSelect(item) {
//     let selectors = document.querySelectorAll('.calc-currency-select');
//     selectors.forEach((elem) => {
//         let option = new Option(`${item}`, `${item}`);
//         elem.append(option);
//         // let currOption = document.createElement('option');
//         // currOption.innerText = `${item}`;
//         // elem.append(currOption);
//     })

// }







