'use strict';
let startBtn = document.querySelector('#start'),
    cancel = document.getElementById('cancel'),
    addIncomeButton = document.getElementsByTagName('button')[0],
    addExpensesButton = document.getElementsByTagName('button')[1],
    depositCheck = document.querySelector('#deposit-check'),
    depositBank = document.querySelector('.deposit-bank'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent'),
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

    class AppData {
        constructor() {
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
        }

        start() {
            if(isNaN(salaryAmount.value) || salaryAmount.value === '' || salaryAmount.value === null) {
                return;
            } else {
                this.budget = +salaryAmount.value;
                this.getAddElementToBlock(additionalExpenses, this.addExpenses);
                this.getAddElementToBlock(additionalIncomeItem, this.addIncome);
                this.getExpenses();
                this.getIncome();
                this.getExpensesMonth();
                this.getInfoDeposit();
                this.getIncomeMonth();
                this.getBudget();
                this.showResult();
            }
        };

         // Добавить обязательные расходы
        addElementToBlock(elem) {
            let cloneItem = elem[0].cloneNode(true);
            let parent = elem[0].parentNode;
            cloneItem.querySelectorAll('input').forEach(item => item.value = '');
            parent.insertBefore(cloneItem, parent.querySelector('.btn_plus'));
            elem = document.querySelectorAll('.' + cloneItem.className + '');
            if(elem.length === 3) {
                parent.querySelector('.btn_plus').style.display = 'none';
            }
        };

        getIncome() {
            incomeItems = document.querySelectorAll('.income-items');
            incomeItems.forEach(item => {
                let itemIncome = item.querySelector('.income-title').value;
                let cashIncome = item.querySelector('.income-amount').value;
                if(itemIncome !== '' && cashIncome !== '') {
                    this.income[itemIncome] = cashIncome;
                }
            });
        };

        getExpenses() {
            const _this = this;
            expensesItems = document.querySelectorAll('.expenses-items');
            expensesItems.forEach(item => {
                let itemExpenses = item.querySelector('.expenses-title').value;
                let cashExpenses = item.querySelector('.expenses-amount').value;
                if(itemExpenses !== '' && cashExpenses !== '') {
                    _this.expenses[itemExpenses] = cashExpenses;
                }
            });
        };

        showResult() {
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

        getAddElementToBlock(element, addArray) {
            let elementsArray = [];
            if (element.length === undefined) {
                elementsArray = element.value.split(',');
                elementsArray.forEach(item => {
                    item = item.trim();
                    if(item !== '') addArray.push(item);
                });
            } else {
                elementsArray = element.forEach(item => {
                item = item.value.trim();
                if(item !== '') addArray.push(item);
                });
            };
        };

        getPeriod() {
        document.querySelector('.period-amount').textContent = periodSelect.value;
        };

        //Сумма всех расходов за месяц
        getExpensesMonth() {
            for(let key in this.expenses) {
                this.expensesMonth += +this.expenses[key];
            }
        };

        //Сумма дополнительных доходов за месяц
        getIncomeMonth() {
            for(let key in this.income) {
                this.incomeMonth += +this.income[key];
            }
        };

        //Накопления за месяц
        getBudget() {
            this.budgetMonth = Math.floor(this.budget + this.incomeMonth - this.expensesMonth + (this.moneyDeposit * this.persentDeposit) / 12);
            this.budgetDay = Math.floor(this.budgetMonth / 30);
        };
        //за какой период будет достигнута цель
        getTargetMonth() {
            return Math.ceil(targetAmount.value / this.budgetMonth)
        };

        getInfoDeposit() {
            if(this.deposit) {
                this.persentDeposit = depositPercent.value.replace(',', '.');
                this.moneyDeposit = depositAmount.value;
            }
        };

        calcSavedMoney() {
            return this.budgetMonth * periodSelect.value
        };

        resetOriginalState() {
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
            depositBank.value = 0;
            depositCheck.checked = false;
            depositBank.style.display = 'none';
            depositAmount.style.display = 'none';
            depositAmount.value = '';
            appData.deposit = 'false';
            depositPercent.style.display = 'none';
        };

        eventsListeners() {
            const _this = this;
            startBtn.addEventListener('click', _this.start.bind(_this));
            cancel.addEventListener('click', _this.resetOriginalState.bind(_this));
            addExpensesButton.addEventListener('click', _this.addElementToBlock.bind(_this, expensesItems));
            addIncomeButton.addEventListener('click',  _this.addElementToBlock.bind(_this, incomeItems));
            periodSelect.addEventListener('input', _this.getPeriod);
            depositCheck.addEventListener('change', function() {
                if(depositCheck.checked) {
                    depositBank.style.display = 'inline-block';
                    depositAmount.style.display = 'inline-block';
                    appData.deposit = 'true';
                    depositBank.addEventListener('change', function() {
                        let selectedIndex = this.options[this.selectedIndex].value;
                        if(selectedIndex === 'other') {
                            depositPercent.style.display = 'inline-block';
                            depositPercent.value = '';
                        } else {
                            depositPercent.style.display = 'none';
                            depositPercent.value = selectedIndex;
                        }
                    })

                } else {
                    depositBank.style.display = 'none';
                    depositAmount.style.display = 'none';
                    depositAmount.value = '';
                    appData.deposit = 'false';
                    depositPercent.style.display = 'none';
                }
            });

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
        };
    };

    let appData = new AppData();
    appData.eventsListeners();

