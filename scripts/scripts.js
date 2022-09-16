'use strict';
let money = 110000, //Месячный доход
    income = 'Фриланс', //Дополнительный доход
    addExpenses = 'Коммуналка,маникюр,фитнес', // Дополнительные расходы
    deposit = false,
    mission = 1000000, // Сумма, которую нужно накопить
    period,
    budgetDay = money/30, //Дневной бюджет
    budgetMonth; // Бюджет за месяц



let showTypeOfData = function(data) {
   console.log(`Тип данных ${data}: ${typeof data}`);
}

showTypeOfData(money);
showTypeOfData(income);
showTypeOfData(deposit);

// money = +prompt('Ваш месячный доход?', money);
console.log(money);
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую?', addExpenses);
console.log(addExpenses.split(','));
deposit = confirm('Есть ли у вас депозит в банке?');

let start = function() {
    money = prompt('Ваш месячный доход?', money);
    do {
        money = prompt('Ваш месячный доход?', money);
        console.log(money);
    }
    while(isNaN(money) || money === '' || money === null);
}
start();

let question1,
    question2;

//Сумма всех расходов за месяц
function getExpensesMonth() {
    let sum = 0;
    for(let i = 0; i < 2; i++) {
        if(i === 0) {
            question1 = prompt('Какие обязательные ежемесячные расходы у вас есть?', 'Квартплата');
        }
        if(i === 0) {
            question2 = prompt('Какие обязательные ежемесячные расходы у вас есть?', 'Проезд');
        }

        sum += +prompt('Во сколько это обойдется?', '10000');
    }
    return sum
}
let expensesAmount = getExpensesMonth();
console.log('expensesAmount: ' + expensesAmount);

//Накопления за месяц
function getAccumulatedMonth() {
    return money - expensesAmount
}

let accumulatedMonth = getAccumulatedMonth();

//за какой период будет достигнута цель
function getTargetMonth() {
    return Math.ceil(mission/accumulatedMonth)
}
period = Math.ceil(mission/budgetMonth);

budgetDay = Math.floor(getAccumulatedMonth()/30);

let getStatusIncome = function() {
    if(budgetDay >= 800) {
        return ('Высокий уровень дохода');
    } else if(budgetDay >= 300 && budgetDay < 800){
        return ('Средний  уровень дохода');
    } else if(budgetDay >= 0 && budgetDay < 300){
        return ('Низкий уровень дохода');
    } else {
        return ('Что то пошло не так');
    }
}
console.log(getStatusIncome());

console.log(accumulatedMonth);
console.log(getTargetMonth() >= 0 ? 'Цель будет достигнута за ' + getTargetMonth() + 'месяцев' : 'Цель не будет достигнута');