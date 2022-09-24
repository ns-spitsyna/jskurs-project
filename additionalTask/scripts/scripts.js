'use strict';
let currentDate = new Date(),
    hours = currentDate.getHours(),
    minutes = currentDate.getMinutes(),
    seconds = currentDate.getSeconds(),
    day = currentDate.getDate(),
    month = currentDate.getMonth() + 1,
    year = currentDate.getFullYear();

//Выведите на страницу текущую дату и время в формате '09:59:59 30.05.2018'
document.write(addNull(hours) + ':' + addNull(minutes) + ':' + addNull(seconds) + ' ' + addNull(day) + '.' + addNull(month) + '.'+ year);

//Напишите функцию, которая будет добавлять 0 перед значениями которые состоят из одной цифры (из 9:5:3  1.6.2019 сделает 09:05:03 01.06.2019)
function addNull(number) {
    return number < 10 ? '0' + number : number
}
