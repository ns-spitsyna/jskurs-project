'use strict';
let startBtn = document.querySelector('#start'),
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
    data = document.querySelector('.data').querySelectorAll('input[type=text]'),
    inputAll = document.querySelector('.calc').querySelectorAll('input'),
    inputName = document.querySelector('.data').querySelectorAll('input[placeholder=Наименование]'),
    inputSum = document.querySelector('.data').querySelectorAll('input[placeholder=Сумма]');

    const AppData = function(){
        this.budget = 0;
        this.budgetDay = 0; //Дневной бюджет
        this.budgetMonth = 0; // Бюджет за месяц
        this.income = {}; //Дополнительный доход
        this.addIncome = [];
        this.expenses = {};
        this.addExpenses = []; // Дополнительные расходы
        this.expensesMonth = 0;
        this.incomeMonth = 0;
        this.deposit = false;
        this.persentDeposit = 0; // Процент депозита
        this.moneyDeposit = 0; // Сумма депозита

    };


    AppData.prototype.start = function() {
        if(isNaN(salaryAmount.value) || salaryAmount.value === '' || salaryAmount.value === null) {
            return;
        } else {
            this.budget = +salaryAmount.value;
            this.getExpenses();
            this.getIncome();
            this.getExpensesMonth();
            this.getIncomeMonth();
            this.getAddExpenses();
            this.getAddIncome();
            this.getBudget();
            this.showResult();
        }
    };
    // Добавить обязательные расходы
    AppData.prototype.addExpensesBlock = function(){
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        cloneExpensesItem.querySelectorAll('input').forEach(item => item.value = '');
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, addExpensesButton);
        expensesItems = document.querySelectorAll('.expenses-items');
        if(expensesItems.length === 3) {
            addExpensesButton.style.display = 'none';
        }
    };

    AppData.prototype.addIncomeBlock = function(){
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        cloneIncomeItem.querySelectorAll('input').forEach(item => item.value = '');
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, addIncomeButton);
        incomeItems = document.querySelectorAll('.income-items');
        if(incomeItems.length === 3) {
            addIncomeButton.style.display = 'none';
        }
    };

    AppData.prototype.getIncome = function(){
        const _this = this;
        incomeItems  .forEach(item => {
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if(itemIncome !== '' && cashIncome !== '') {
                _this.income[itemIncome] = cashIncome;
            }
        });
    };

    AppData.prototype.getExpenses = function(){
        const _this = this;
        expensesItems.forEach(item => {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if(itemExpenses !== '' && cashExpenses !== '') {
                _this.expenses[itemExpenses] = cashExpenses;
            }
        });
    };

    AppData.prototype.showResult = function() {
        const _this = this;
        budgetDayValue.value = this.budgetDay;
        budgetMonthValue.value = this.budgetMonth;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(this.getTargetMonth());
        incomePeriodValue.value = this.calcSavedMoney();
        periodSelect.addEventListener('input', () =>{
            incomePeriodValue.value = _this.calcSavedMoney();
        });

        data = document.querySelector('.data').querySelectorAll('input[type=text]');
        data.forEach(item => item.disabled = 'disabled');
        startBtn.style.display = 'none';
        cancel.style.display = 'block';
    };

    AppData.prototype.getAddExpenses = function(){
        const _this = this;
        let addExpenses = additionalExpenses.value.split(',');
        addExpenses.forEach(item => {
            item = item.trim();
            if(item !== '') {
                _this.addExpenses.push(item);
            }
        })
    };
    AppData.prototype.getAddIncome = function(){
        const _this = this;
        additionalIncomeItem.forEach(item => {
            let itemValue = item.value.trim();
            if(itemValue !== '') {
                _this.addIncome.push(itemValue);
            }
        })
    };

    AppData.prototype.getPeriod = function(){
       document.querySelector('.period-amount').textContent = periodSelect.value;
    };

    //Сумма всех расходов за месяц
    AppData.prototype.getExpensesMonth = function() {
        for(let key in this.expenses) {
            this.expensesMonth += +this.expenses[key];
        }
    };

    //Сумма дополнительных доходов за месяц
    AppData.prototype.getIncomeMonth = function() {
        for(let key in this.income) {
            this.incomeMonth += +this.income[key];
        }
    };

    //Накопления за месяц
    AppData.prototype.getBudget = function() {
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = Math.floor(this.budgetMonth / 30);
    };
    //за какой период будет достигнута цель
    AppData.prototype.getTargetMonth = function() {
        return Math.ceil(targetAmount.value / this.budgetMonth)
    };

    AppData.prototype.getStatusIncome = function() {
        if(this.budgetDay >= 800) {
            return ('Высокий уровень дохода');
        } else if(this.budgetDay >= 300 && this.budgetDay < 800){
            return ('Средний  уровень дохода');
        } else if(this.budgetDay >= 0 && this.budgetDay < 300){
            return ('Низкий уровень дохода');
        } else {
            return ('Что то пошло не так');
        }
    };

    AppData.prototype.getInfoDeposit = function() {
        if(this.deposit) {
            this.persentDeposit = getNumber('Какой годовой процент', '10');
            this.moneyDeposit = getNumber('Какая сумма заложена?', '');
        }
    };

    AppData.prototype.calcSavedMoney = function() {
        return this.budgetMonth * periodSelect.value
    };

    AppData.prototype.resetOriginalState = function() {
        appData = new AppData();
        inputAll.forEach(item =>{
            item.value = '';
        });
        periodSelect.value = 1;
        this.getPeriod();
        data = document.querySelector('.data').querySelectorAll('input[type=text]');
        data.forEach(item => item.disabled = false);
        startBtn.style.display = 'block';
        cancel.style.display = 'none';

    };

    AppData.prototype.eventsListeners = function() {
        const _this = this;
        startBtn.addEventListener('click', _this.start.bind(_this));
        cancel.addEventListener('click', _this.resetOriginalState.bind(_this));
        addExpensesButton.addEventListener('click', _this.addExpensesBlock);
        addIncomeButton.addEventListener('click', _this.addIncomeBlock);
        periodSelect.addEventListener('input', _this.getPeriod);
    };





    inputName.forEach(item =>{
        item.addEventListener('input', () => {
            item.value = item.value.replace(/[^а-я]/,'');
        });
    });

    inputSum.forEach(item =>{
        item.addEventListener('input', () => {
            item.value = item.value.replace(/[^0-9\.]/g,'');
        });
    });



function getNumber(question, defaultValue) {
    let answerValue;
    do {
        answerValue = +prompt(question, defaultValue);
    }
    while(isNaN(answerValue) || answerValue === '' || answerValue === null || answerValue <= 0);
    return answerValue;
};


let appData = new AppData();
appData.eventsListeners();
