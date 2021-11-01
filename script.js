
// https://api.exchangerate.host/latest?base=USD&symbols=RUB 

// let currencyFrom = "";
// let currencyTo = "";
// let amount = 0;

let selector = document.querySelectorAll('.calc-currency-select');
let button = document.querySelectorAll('.calc-currency-item');
// const calcCurrencyBox = document.querySelector('.calc-currency');

button.forEach(item => {
    item.addEventListener('click', function (event) {
            if (event.target.tagName === "BUTTON") {
                // console.log(event.target.innerText);
                item.classList.toggle('active');
            }
        })
});



// Получить rates от доллара к рублю через API: (сначала сделать для пар, которые уже есть в html-ке? потом для тех, которые в Селекте?):

// https://api.exchangerate.host/latest?base=USD&symbols=RUB 

function ;



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




// Добавляем обоим селекторам обработчики событий по типу change (т.е. на изменение элемента):
selector.forEach((item) => {
    item.addEventListener('change', selectorHandler);

})

    
function selectorHandler (event) {
    if (event.target.value) {
        let selected = document.querySelector('option');
        selected.classList.toggle('active');
        // this.classList.toggle('active');
    }
        // selector.options[selector.selectedIndex].value);
};    


// wrapper.forEach((item) => {
//     item.addEventListener('change', (event) => {
//         if(event.target.tagName ==='SELECT') {
//           if (event.target.value==="2") {
//             console.log(this.innerText)};
//         }
//       })
// })

  
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
        // console.log(option);
        elem.append(option);
        // let currOption = document.createElement('option');
        // currOption.innerText = `${item}`;
        // elem.append(currOption);
    })

}







