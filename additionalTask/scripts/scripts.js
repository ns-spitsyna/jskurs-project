'use strict';
let num = 266219;
let multiplicationNumbers = ('' + num).split('').reduce((sum, item) => sum*Number(item), 1); //Произведение чисел num

console.log(`Произведение чисел 266219 равна: ${multiplicationNumbers}`);

let result = (multiplicationNumbers**3).toString().slice(0,2); // Возведение результата в степень 3 и получение первых двух чисел
console.log(`Первые 2 цифры полученного числа ${multiplicationNumbers**3}: ${result}`);

