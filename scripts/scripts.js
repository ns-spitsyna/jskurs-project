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

money = +prompt('Ваш месячный доход?', money);
console.log(money);
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую?', addExpenses);
console.log(addExpenses.split(','));
deposit = confirm('Есть ли у вас депозит в банке?');

let question1,
    question2,
    answer1,
    answer2;

for(let i = 0; i < 2; i++) {
    switch(i) {
        case 0:
            question1 = prompt('Какие обязательные ежемесячные расходы у вас есть?', 'xcvcxbxcb');
            answer1 = +prompt('Во сколько это обойдется?', '10000');
            break;
        case 1:
            question2 = prompt('Какие обязательные ежемесячные расходы у вас есть?', 'xcvcxbxcb');
            answer2 = +prompt('Во сколько это обойдется?', '10000');
            break;
        default:
            break;
    }
}

budgetMonth = money - (answer1 + answer2);

period = Math.ceil(mission/budgetMonth);

budgetDay = Math.floor(budgetMonth/30);


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

//Сумма всех расходов за месяц
function getExpensesMonth() {
    return answer1 + answer2
}

//Накопления за месяц
function getAccumulatedMonth() {
    return money - getExpensesMonth()
}

let accumulatedMonth = getAccumulatedMonth();

//за какой период будет достигнута цель
function getTargetMonth() {
    return Math.ceil(mission/accumulatedMonth)
}

console.log(accumulatedMonth);
console.log(getTargetMonth());


