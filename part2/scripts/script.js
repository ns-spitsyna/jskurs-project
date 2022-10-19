window.addEventListener('DOMContentLoaded', function() {
    'use strict';
    // Timer
    function countTimer(deadline) {
        let timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');

        function getTimeREmaining() {
            let dateStop = new Date(deadline).getTime(),
                dateNow = new Date().getTime(),
                timeRemaning = (dateStop - dateNow)/1000,
                seconds = Math.floor(timeRemaning % 60),
                minutes = Math.floor((timeRemaning / 60) % 60),
                hours = Math.floor(timeRemaning / 60 / 60);
                return {timeRemaning, hours, minutes, seconds};
        }

        function updateClock() {
            let timer = getTimeREmaining();

            timerHours.textContent = addNull(timer.hours);
            timerMinutes.textContent = addNull(timer.minutes);
            timerSeconds.textContent = addNull(timer.seconds);


            if(timer.timeRemaning > 0){
                setInterval(updateClock, 1000);
            } else {
                clearInterval(timer);
                timerHours.textContent = '00';
                timerMinutes.textContent = '00';
                timerSeconds.textContent = '00';
                timer.hours = 0;
                timer.minutes = 0;
                timer.seconds = 0;
            }

            function addNull(number) {
                if(number < 10)  {
                    return '0' + number;
                }
                return number;
            }
        }
        updateClock();
    }
    countTimer('20 oct 2022');
});