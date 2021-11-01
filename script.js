
// https://api.exchangerate.host/latest?base=USD&symbols=RUB 



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

boxFrom = document.querySelector('.from');
currencyFromBtn = boxFrom.querySelectorAll('.calc-currency-item');
boxTo = document.querySelector('.to');
currencyToBtn = boxTo.querySelectorAll('.calc-currency-item');
amountField = document.querySelector('.calc-input-field');

currencyFromBtn.forEach(item => {
    item.addEventListener('click', (event) => {
        currencyFrom = `${event.target.innerText}`;
        console.log(currencyFrom);
    })

    item.addEventListener('click', (event) => {
        if (event.target.tagName === "BUTTON") {
            item.classList.toggle('active');
        }
    })
})


currencyToBtn.forEach(item => {
    item.addEventListener('click', (event) => {
        currencyTo = `${event.target.innerText}`;
        console.log(currencyTo);
    })

    item.addEventListener('click', (event) => {
        if (event.target.tagName === "BUTTON") {
            item.classList.toggle('active');
        }
    })
})

amountField.addEventListener('change', (event) => {
    amount = `${event.target.value}`;
    console.log(amount);
})


function getConverted(currencyFrom, currencyTo, amount) {
    return new Promise((resolve, reject) => {
        fetch(`https://api.exchangerate.host/latest?base=${currencyFrom}&symbols=${currencyTo}&amount=${amount}`)
            .then(response => response.json())
            .then(data => {
                console.log(data.rates);
                resolve(data);
            })
            .catch(error => {
                reject(error);
            })
    })
}

getConverted('USD', 'RUB', 2000);


// console.log(data.rates);

// const getConverted = async (currencyFrom, currencyTo, amount) => {
//     const response = await fetch(`https://api.exchangerate.host/latest?base=${currencyFrom}&symbols=${currencyTo}&amount=${amount}`);
//     const data = await response.json();
//     return data
// }

// ____________________________________________________________________________________________//


// Добавляем обоим селекторам обработчики событий по типу change (т.е. на изменение элемента?):
selector.forEach((item) => {
    item.addEventListener('change', selectorHandler);
})

function selectorHandler(event) {
    if (event.target.value) {
        let selected = document.querySelector('option');
        selected.classList.toggle('active');
        // this.classList.toggle('active');
    }
    // selector.options[selector.selectedIndex].value);
};

getCurrency();
let currencyArr = [];
function getCurrency() {
    fetch('https://api.exchangerate.host/latest')
        .then(response => response.json())
        .then(data => {
            currencyArr = Object.keys(data.rates);
            currencyArr.forEach(item => {
                renderSelect(item);
            })
        })
}

function renderSelect(item) {
    let selectors = document.querySelectorAll('.calc-currency-select');
    selectors.forEach((elem) => {
        let option = new Option(`${item}`, `${item}`);
        elem.append(option);
        // let currOption = document.createElement('option');
        // currOption.innerText = `${item}`;
        // elem.append(currOption);
    })

}







