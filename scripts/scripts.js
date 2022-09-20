'use strict';
let money = 110000, //Месячный доход
    start = function() {
        do {
            money = prompt('Ваш месячный доход?', money);
        }
        while(isNaN(money) || money === '' || money === null);
    };

    let appData = {
        budget: money,
        budgetDay: 0, //Дневной бюджет
        budgetMonth: 0, // Бюджет за месяц
        income: {}, //Дополнительный доход
        addIncome: [],
        expenses: {},
        addExpenses: [], // Дополнительные расходы
        expensesMonth: 0,
        deposit: false,
        persentDeposit: 0, // Процент депозита
        moneyDeposit: 0, // Сумма депозита
        mission: 1000000, // Сумма, которую нужно накопить
        period: 3,
        asking: function() {
            if(confirm('Есть ли у вас дополнительный источник заработка?')) {
                let itemIncome = getString('Какой у вас дополнительный заработок?', '');
                appData.income[itemIncome] = getNumber('Сколько в месяц вы на этом зарабатываете?', '');
            }

            let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую?', 'Йога,косметика,проезд');
            appData.addExpenses = addExpenses.toLowerCase().split(',');
            appData.deposit = confirm('Есть ли у вас депозит в банке?');

            for(let i = 0; i < 2; i++) {
                let question = getString('Какие обязательные ежемесячные расходы у вас есть?', 'Квартплата');
                appData.expenses[question] = getNumber('Во сколько это обойдется?', '');
            }
        },
        //Сумма всех расходов за месяц
        getExpensesMonth: function() {
            for(let key in appData.expenses) {
                appData.expensesMonth += appData.expenses[key];
            }
        },
        //Накопления за месяц
        getBudget: function() {
            appData.budgetMonth = appData.budget - appData.expensesMonth;
            appData.budgetDay = Math.floor(appData.budgetMonth / 30);
        },
        //за какой период будет достигнута цель
        getTargetMonth: function() {
            return Math.ceil(appData.mission / appData.budgetMonth)
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
        getInfoDeposit: function() {
            if(appData.deposit) {
                appData.persentDeposit = getNumber('Какой годовой процент', '10');
                appData.moneyDeposit = getNumber('Какая сумма заложена?', '');
            }
        },
        calcSavedMoney: function() {
            return appData.budgetMonth * appData.period
        }
    };

function getNumber(question, defaultValue) {
    let answerValue;
    do {
        answerValue = +prompt(question, defaultValue);
    }
    while(isNaN(answerValue) || answerValue === '' || answerValue === null || answerValue <= 0);
    return answerValue;
};

function getString(question, defaultValueqQuestion) {
    let answerValueString;
    do {
        answerValueString = prompt(question, defaultValueqQuestion);
    }
    while (Number(answerValueString) || answerValueString === '' || answerValueString === null);
    return answerValueString;
};
start();
appData.asking();
appData.getExpensesMonth();
appData.getBudget();

console.log('Расходы за месяц: ' + appData.expensesMonth);
console.log('Уровень дохода: ' + appData.getStatusIncome());
console.log(appData.getTargetMonth() >= 0 ? 'Цель будет достигнута за ' + appData.getTargetMonth() + ' месяцев' : 'Цель не будет достигнута');
console.log('Наша программа включает в себя данные: \n');
for(let key in appData) {
    console.log(key, appData[key]);
};

let addExpensesFormat = [];
for(let item of appData.addExpenses) {
    item = item.slice(0,1).toUpperCase() + item.slice(1);
    addExpensesFormat.push(item);
}
console.log(addExpensesFormat.join(', '));

// appData.getInfoDeposit();
// console.log(appData.persentDeposit, appData.moneyDeposit, appData.calcSavedMoney(), appData.budgetMonth,appData.period);

