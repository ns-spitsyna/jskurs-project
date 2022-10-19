window.addEventListener('DOMContentLoaded', function() {
    'use strict';
    function dayTime(time){

        let timesDay = document.querySelector('.times-day');
        if((time <= 5) || (time === 0)) {
            timesDay.textContent = 'ночь';
        } else if((time >= 6) && (time < 12)) {
            timesDay.textContent = 'утро';
        } else if((time >= 12) && (time < 18)) {
            timesDay.textContent = 'день';
        } else if((time >= 18) && (time < 24)) {
            timesDay.textContent = 'вечер';
        }
    }
    const start = new Date();
    dayTime(start.getHours());

    let week = [ 'Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота' ],
        currentTime = document.querySelector('.time-now'),
        weekDay = document.querySelector('.week-day');

    weekDay.textContent = week[start.getDay()];
    currentTime.textContent = start.toLocaleTimeString('en-US');
    function getDay(deadline) {
        let amountDays = document.querySelector('.amount-days');
        let numberDay = getTimeREmaining();
        amountDays.textContent = numberDay.amountDay + ' ' + getWordForm(numberDay.amountDay, ['день', 'дня', 'дней']);

        function getTimeREmaining() {
            let dateStop = new Date(deadline).getTime(),
                dateNow = new Date().getTime(),
                timeRemaning = (dateStop - dateNow)/1000,
                amountDay = Math.floor((timeRemaning / 60 / 60) / 24);
                return {timeRemaning, amountDay};
        }

        function getWordForm(value, words){
            value = Math.abs(value) % 100;
            let num = value % 10;
            if(value > 10 && value < 20) return words[2];
            if(num > 1 && num < 5) return words[1];
            if(num == 1) return words[0];
            return words[2];
        }
    }
    getDay('01 jan 2023');
});