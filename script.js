// Находим все нужные элементы и контролы:
const fromPanel = document.querySelector('.from');
const toPanel = document.querySelector('.to');

const fromInput = fromPanel.querySelector('.calc-input-field');
const toInput = toPanel.querySelector('.calc-input-field');

const fromButtonList = fromPanel.querySelector('.calc-currency');
const toButtonList = toPanel.querySelector('.calc-currency');

const fromRate = fromPanel.querySelector('.calc-input-rate');
const toRate = toPanel.querySelector('.calc-input-rate');

const fromSelector = fromPanel.querySelector('select.calc-currency-item');
const toSelector = toPanel.querySelector('select.calc-currency-item');

const state = { from: 'RUB', to: 'USD', amount: 1 }

initialApp();

// Получаем данные с сервера с параметрами запроса сразу с суммой к конвертации:

async function convert(from, to, amount) {
    const response = await fetch(`https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}&places=4`);
    const data = await response.json();
    return [data.result, data.info.rate];
}

function activateButton(button) {
    button.classList.add('active');
}

function disableButton(button) {
    button.classList.remove('active');
}

function getActiveButton(buttonList) {
    return buttonList.querySelector('.active');
}

function getButtonByCurrency(currency, buttonList) {
    return buttonList.querySelector(`.calc-currency-item[value=${currency}]`);
}

function initialApp() {
    activateButton(getButtonByCurrency(state.from, fromButtonList));
    activateButton(getButtonByCurrency(state.to, toButtonList));
}

// const [result, rate] = convert();

// Обработчики событий на инпуты, кнопки выбора валюты и селекты:

fromInput.addEventListener('input', async (event) => {
    let rate;
    let currencyFrom = fromButtonList.querySelector('.active').value;
    let currencyTo = toButtonList.querySelector('.active').value;
    [toInput.value, rate] = await convert(currencyFrom, currencyTo, event.target.value);

    fromRate.innerText = (currencyFrom === currencyTo) ? `1 ${currencyFrom} = 1 ${currencyTo.toFixed(0)}`:  `1 ${currencyFrom} = ${rate} ${currencyTo}`; 
    toRate.innerText = (currencyFrom === currencyTo) ? `1 ${currencyFrom} = 1 ${currencyTo.toFixed(0)}` : `1 ${currencyTo} = ${(1/ rate).toFixed(4)} ${currencyFrom}`;

    // console.log(`toInput value:  ${toInput.value}, rate: ${rate}, event.target.value: ${event.target.value}, currencyFrom: ${currencyFrom}, currencyTo: ${currencyTo}`);
})


toInput.addEventListener('input', async (event) => {
    // let rate;
    let currencyFrom = fromButtonList.querySelector('.active').value;
    let currencyTo = toButtonList.querySelector('.active').value;
    [fromInput.value, rate] = await convert(currencyTo, currencyFrom, event.target.value);

    fromRate.innerText = (currencyFrom === currencyTo) ? `1 ${currencyFrom} = 1 ${currencyTo.toFixed(0)}`:  `1 ${currencyFrom} = ${rate} ${currencyTo}`; 
    toRate.innerText = (currencyFrom === currencyTo) ? `1 ${currencyFrom} = 1 ${currencyTo.toFixed(0)}` : `1 ${currencyTo} = ${(1/ rate).toFixed(4)} ${currencyFrom}`;

    // console.log("fromInput value: ", fromInput.value, "rate: ---- test", "event.target.value: ", event.target.value, "currencyFrom: ", currencyFrom, "currencyTo: ", currencyTo)
})

// События, которые выделяют кнопки "активными" при нажатии:

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

// Проверяем, является ли выделенный контрол кнопкой или селектом - и в зависимости от этого считаем:

fromButtonList.addEventListener("click", async (event) => {
    if (event.target.tagName === "BUTTON") {
        let rate;
        let currencyFrom = event.target.value;
        let currencyTo = toButtonList.querySelector('.active').value;
        [toInput.value, rate] = await convert(currencyFrom, currencyTo, fromInput.value);

        fromRate.innerText = (currencyFrom === currencyTo) ? `1 ${currencyFrom} = 1 ${currencyTo}`:  `1 ${currencyFrom} = ${rate} ${currencyTo}`; 
        toRate.innerText = (currencyFrom === currencyTo) ? `1 ${currencyFrom} = 1 ${currencyTo}` : `1 ${currencyTo} = ${(1/ rate).toFixed(4)} ${currencyFrom}`;

        // console.log(`fromButtonList:  toInput value:  ${toInput.value}, rate: ${rate}, event.target.value: ${event.target.value}, currencyFrom: ${currencyFrom}, currencyTo: ${currencyTo}`);
    }
    
});

fromSelector.addEventListener("change", async (event) => {
    if (event.target.tagName === "SELECT") {
        let rate;
        let currencyFrom = event.target.value;
        let currencyTo = toButtonList.querySelector('.active').value;

        [toInput.value, rate] = await convert(currencyFrom, currencyTo, fromInput.value);
        fromRate.innerText = (currencyFrom === currencyTo) ? `1 ${currencyFrom} = 1 ${currencyTo}`:  `1 ${currencyFrom} = ${rate} ${currencyTo}`; 
        toRate.innerText = (currencyFrom === currencyTo) ? `1 ${currencyFrom} = 1 ${currencyTo}` : `1 ${currencyTo} = ${(1/ rate).toFixed(4)} ${currencyFrom}`;

        // console.log(`fromSelect:   toInput value:  ${toInput.value}, rate: ${rate}, event.target.value: ${event.target.value}, currencyFrom: ${currencyFrom}, currencyTo: ${currencyTo}`);
    }
    
})



toButtonList.addEventListener("click", async (event) => {

    if (event.target.tagName === "BUTTON") {
        let currencyFrom = event.target.value;
        let currencyTo = fromButtonList.querySelector('.active').value;
        [toInput.value, rate] = await convert(currencyTo, currencyFrom, fromInput.value);

        fromRate.innerText = (currencyFrom === currencyTo) ? `1 ${currencyFrom} = 1 ${currencyTo}`:  `1 ${currencyFrom} = ${rate} ${currencyTo}`; 
        toRate.innerText = (currencyFrom === currencyTo) ? `1 ${currencyFrom} = 1 ${currencyTo}` : `1 ${currencyTo} = ${(1/ rate).toFixed(4)} ${currencyFrom}`;

        // console.log(`toButtonList: "fromRate.innerText "${fromRate.innerText} toInput value:  ${toInput.value}, rate: , event.target.value: ${event.target.value}, currencyFrom: ${currencyFrom}, currencyTo: ${currencyTo}`);
    }
});


toSelector.addEventListener("change", async (event) => {
    if (event.target.tagName === "SELECT") {
        let currencyFrom = event.target.value;
        let currencyTo = fromButtonList.querySelector('.active').value;

        [toInput.value, rate] = await convert(currencyTo, currencyFrom, fromInput.value);

        fromRate.innerText = (currencyFrom === currencyTo) ? `1 ${currencyFrom} = 1 ${currencyTo}`:  `1 ${currencyFrom} = ${rate} ${currencyTo}`; 
        toRate.innerText = (currencyFrom === currencyTo) ? `1 ${currencyFrom} = 1 ${currencyTo}` : `1 ${currencyTo} = ${(1/ rate).toFixed(4)} ${currencyFrom}`;

        // console.log(`toSelect:   toInput value:  ${toInput.value}, event.target.value: ${event.target.value}, currencyFrom: ${currencyFrom}, currencyTo: ${currencyTo}`);
    }
});



// Запрос на получение всех вариантов валют с сервера:
async function getCurrency() {
    const resp = await fetch("https://api.exchangerate.host/latest")
    const data = await resp.json()
    return data;
}

//Получаем данные с сервера
getCurrency()
    .then((data) => {
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


