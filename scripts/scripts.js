'use strict';
let start = document.getElementById('start'),
    addIncomeButton = document.getElementsByTagName('button')[0],
    addExpensesButton = document.getElementsByTagName('button')[1],
    deposit = document.querySelector('.deposit-check'),
    itemIncome = document.querySelectorAll('.additional_income-item'),

    budgetDay = document.getElementsByClassName('budget_day-value'),
    budgetMonth = document.getElementsByClassName('budget_month-value'),
    expensesMonth = document.getElementsByClassName('expenses_month-value'),
    addIncome = document.getElementsByClassName('additional_income-value'),
    addExpenses = document.getElementsByClassName('additional_income-value'),
    incomePeriod = document.getElementsByClassName('income_period-value'),
    targetMonth = document.getElementsByClassName('target_month-value'),

    money = document.querySelector('.salary-amount'),

    incomeTitle = document.querySelector('.income-title'),
    incomeAmount = document.querySelector('.income-amount'),
    expensesTitle = document.querySelector('.expenses-title'),
    expensesAmount = document.querySelector('.expenses-amount'),
    addExpensesItem = document.querySelector('.additional_expenses-item'),

    mission = document.querySelector('.target-amount'),
    period = document.querySelector('.period-select');


console.log(start,
    addIncomeButton,
    addExpensesButton,
    deposit,
    itemIncome,
    budgetDay,
    budgetMonth,
    expensesMonth,
    addIncome,
    addExpenses,
    incomePeriod,
    targetMonth,
    money,
    incomeTitle,
    incomeAmount,
    expensesTitle,
    expensesAmount,
    addExpensesItem,
    mission,
    period,
     );