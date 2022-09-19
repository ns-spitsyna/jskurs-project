'use strict';
let money = 110000, //Месячный доход
    start = function() {
        do {
            money = prompt('Ваш месячный доход?', money);
        }
        while(isNaN(money) || money === '' || money === null);
    };

    let question1,
    question2;


    let appData = {
        income: {}, //Дополнительный доход
        addIncome: [],
        expenses: {},
        addExpenses: [], // Дополнительные расходы
        deposit: false,
        mission: 1000000, // Сумма, которую нужно накопить
        period: 3,
        budget: money,
        budgetDay: 0, //Дневной бюджет
        budgetMonth: 0, // Бюджет за месяц
        expensesMonth: 0,
        asking: function() {
            let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую?', '');
            appData.addExpenses = addExpenses.toLowerCase().split(',');
            appData.deposit = confirm('Есть ли у вас депозит в банке?');

            let sum = 0,
            question;
            for(let i = 0; i < 2; i++) {
                question = prompt('Какие обязательные ежемесячные расходы у вас есть?', 'Квартплата');
                // while(!sum) {
                    sum = +prompt('Во сколько это обойдется?', '10000');
                // }

                appData.expenses[question] = sum;
            }
        },
        //Сумма всех расходов за месяц
        getExpensesMonth: function() {
            let sum = 0;
            for(let key in appData.expenses) {
                sum += appData.expenses[key];
            }
            return sum
        },
        //Накопления за месяц
        getBudget: function() {
            return money - appData.expensesMonth
        },
        //за какой период будет достигнута цель
        getTargetMonth: function() {
            return Math.ceil(appData.mission/accumulatedMonth)
        },
        getStatusIncome: function() {
            if(appData.budgetDay >= 800) {
                return ('Высокий уровень дохода');
            } else if(appData.budgetDay >= 300 && appData.budgetDay < 800){
                return ('Средний  уровень дохода');
            } else if(appData.budgetDay >= 0 && appData.budgetDay < 300){
                return ('Низкий уровень дохода');
            } else {
                return ('Что то пошло не так');
            }
        },
    }

start();
appData.asking();

appData.expensesMonth = appData.getExpensesMonth();

let accumulatedMonth = appData.getBudget();

appData.budgetMonth = money - appData.expensesMonth;
appData.period = Math.ceil(appData.mission/appData.budgetMonth);
appData.budgetDay = Math.floor(appData.getBudget()/30);

console.log('Расходы за месяц: ' + appData.expensesMonth);
console.log('Уровень дохода: ' + appData.getStatusIncome());
console.log(appData.getTargetMonth() >= 0 ? 'Цель будет достигнута за ' + appData.getTargetMonth() + ' месяцев' : 'Цель не будет достигнута');
console.log('Наша программа включает в себя данные: \n');
for(let key in appData) {
    console.log(key, appData[key]);
}


