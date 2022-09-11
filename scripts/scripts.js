'use strict';
let money = 110000, //Месячный доход
    income = 'Фриланс', //Дополнительный доход
    addExpenses = 'Коммуналка,маникюр,фитнес', // Дополнительные расходы
    deposit = false,
    mission = 1000000, // Сумма, которую нужно накопить
    period,
    budgetDay = money/30, //Дневной бюджет
    budgetMonth; // Бюджет за месяц

console.log('Тип данных money: '+ typeof money);
console.log('Тип данных income: ' + typeof income);
console.log('Тип данных deposit: ' + typeof deposit);

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
console.log(question1, question2, answer1, answer2);

budgetMonth = money - (answer1 + answer2);
console.log(budgetMonth);

period = Math.ceil(mission/budgetMonth);
console.log(period);

budgetDay = Math.floor(budgetMonth/30);
console.log(budgetDay);

if(budgetDay >= 800) {
    console.log('Высокий уровень дохода');
} else if(budgetDay >= 300 && budgetDay < 800){
    console.log('Средний  уровень дохода');
} else if(budgetDay >= 0 && budgetDay < 300){
    console.log('Низкий уровень дохода');
} else {
    console.log('Что то пошло не так');
}