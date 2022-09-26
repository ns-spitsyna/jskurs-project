'use strict';
let start = document.querySelector('#start'),
    cancel = document.getElementById('cancel'),
    addIncomeButton = document.getElementsByTagName('button')[0],
    addExpensesButton = document.getElementsByTagName('button')[1],
    depositCheck = document.querySelector('.deposit-check'),
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
    targetMonthValue = document.getElementsByClassName('target_month-value')[0],
    salaryAmount = document.querySelector('.salary-amount'),
    incomeItems = document.querySelectorAll('.income-items'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    additionalExpenses = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'), // Сумма, которую нужно накопить
    periodSelect = document.querySelector('.period-select'),
    data = document.querySelector('.data').querySelectorAll('input[type=text]');

    let appData = {
        budget: 0,
        budgetDay: 0, //Дневной бюджет
        budgetMonth: 0, // Бюджет за месяц
        income: {}, //Дополнительный доход
        addIncome: [],
        expenses: {},
        addExpenses: [], // Дополнительные расходы
        expensesMonth: 0,
        incomeMonth: 0,
        deposit: false,
        persentDeposit: 0, // Процент депозита
        moneyDeposit: 0, // Сумма депозита
        start: function() {
            if(isNaN(salaryAmount.value) || salaryAmount.value === '' || salaryAmount.value === null) {
                return;
            } else {
                appData.budget = +salaryAmount.value;
                appData.getExpenses();
                appData.getIncome();
                appData.getExpensesMonth();
                appData.getIncomeMonth();
                appData.getAddExpenses();
                appData.getAddIncome();
                appData.getBudget();
                appData.showResult();
            }
        },
        // Добавить обязательные расходы
        addExpensesBlock: function(){
            let cloneExpensesItem = expensesItems[0].cloneNode(true);
            expensesItems[0].parentNode.insertBefore(cloneExpensesItem, addExpensesButton);
            expensesItems = document.querySelectorAll('.expenses-items');
            if(expensesItems.length === 3) {
                addExpensesButton.style.display = 'none';
            }
        },

        addIncomeBlock: function(){
            let cloneIncomeItem = incomeItems[0].cloneNode(true);
            incomeItems[0].parentNode.insertBefore(cloneIncomeItem, addIncomeButton);
            incomeItems = document.querySelectorAll('.income-items');
            if(incomeItems.length === 3) {
                addIncomeButton.style.display = 'none';
            }
        },

        getIncome: function(){
            incomeItems  .forEach(item => {
                let itemIncome = item.querySelector('.income-title').value;
                let cashIncome = item.querySelector('.income-amount').value;
                if(itemIncome !== '' && cashIncome !== '') {
                    appData.income[itemIncome] = cashIncome;
                }
            });
        },

        getExpenses: function(){
            expensesItems.forEach(item => {
                let itemExpenses = item.querySelector('.expenses-title').value;
                let cashExpenses = item.querySelector('.expenses-amount').value;
                if(itemExpenses !== '' && cashExpenses !== '') {
                    appData.expenses[itemExpenses] = cashExpenses;
                }
            });
        },

        showResult: function() {
            budgetDayValue.value = appData.budgetDay;
            budgetMonthValue.value = appData.budgetMonth + appData.incomeMonth;
            expensesMonthValue.value = appData.expensesMonth;
            additionalExpensesValue.value = appData.addExpenses.join(', ');
            additionalIncomeValue.value = appData.addIncome.join(', ');
            targetMonthValue.value = Math.ceil(appData.getTargetMonth());
            incomePeriodValue.value = appData.calcSavedMoney();
            periodSelect.addEventListener('input', () =>{
                incomePeriodValue.value = appData.calcSavedMoney();
            });

            data = document.querySelector('.data').querySelectorAll('input[type=text]');
            data.forEach(item => item.disabled = 'disabled');
            start.style.display = 'none';
            cancel.style.display = 'block';
        },

        getAddExpenses: function(){
            let addExpenses = additionalExpenses.value.split(',');
            addExpenses.forEach(item => {
                item = item.trim();
                if(item !== '') {
                    appData.addExpenses.push(item);
                }
            })
        },
        getAddIncome: function(){
            additionalIncomeItem.forEach(item => {
                let itemValue = item.value.trim();
                if(itemValue !== '') {
                    appData.addIncome.push(itemValue);
                }
            })
        },

        getPeriod: function(){
           document.querySelector('.period-amount').textContent = periodSelect.value;
        },

        //Сумма всех расходов за месяц
        getExpensesMonth: function() {
            for(let key in appData.expenses) {
                appData.expensesMonth += +appData.expenses[key];
            }
        },

        //Сумма дополнительных доходов за месяц
        getIncomeMonth: function() {
            for(let key in appData.income) {
                appData.incomeMonth += +appData.income[key];
            }
        },

        //Накопления за месяц
        getBudget: function() {
            appData.budgetMonth = appData.budget - appData.expensesMonth;
            appData.budgetDay = Math.floor(appData.budgetMonth / 30);
        },
        //за какой период будет достигнута цель
        getTargetMonth: function() {
            return Math.ceil(targetAmount.value / appData.budgetMonth)
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
            return appData.budgetMonth * periodSelect.value
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

start.addEventListener('click', appData.start);
addExpensesButton.addEventListener('click', appData.addExpensesBlock);
addIncomeButton.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', appData.getPeriod);
