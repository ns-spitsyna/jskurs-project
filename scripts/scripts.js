'use strict';
let money = 100000, //Доход за месяц
    income = 'Фриланс', //Дополнительный доход
    addExpenses = 'Коммуналка, маникюр, фитнес', // Дополнительные расходы
    deposit = false,
    mission = 1000000, // Сумма, которую нужно накопить
    period = 12,
    budgetDay = money/30; //Дневной бюджет

console.log('Тип данных money: '+ typeof money);
console.log('Тип данных income: ' + typeof income);
console.log('Тип данных deposit: ' + typeof deposit);
console.log('Длина строки Фриланс: ' + income.length);
console.log(`Период: ${period} месяцев`);
console.log(`Цель заработать: ${mission} рублей`);

let addExpensesArray = addExpenses.toLowerCase().split(',');
console.log(addExpensesArray);

let budgetDayRemainder = money%30;
console.log(budgetDay, budgetDayRemainder);


