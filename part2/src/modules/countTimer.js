const countTimer = (deadline) => {
    const timerHours = document.querySelector('#timer-hours'),
        timerMinutes = document.querySelector('#timer-minutes'),
        timerSeconds = document.querySelector('#timer-seconds');

   const getTimeREmaining = () => {
        const dateStop = new Date(deadline).getTime(),
            dateNow = new Date().getTime(),
            timeRemaning = (dateStop - dateNow)/1000,
            seconds = Math.floor(timeRemaning % 60),
            minutes = Math.floor((timeRemaning / 60) % 60),
            hours = Math.floor(timeRemaning / 60 / 60);
            return {timeRemaning, hours, minutes, seconds};
    }
    const addZero = (number) => {
        if(number < 10)  {
            return '0' + number;
        }
        return number;
    }

    const updateClock = () => {
        let timer = getTimeREmaining();

        timerHours.textContent = addZero(timer.hours);
        timerMinutes.textContent = addZero(timer.minutes);
        timerSeconds.textContent = addZero(timer.seconds);


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
    }
    updateClock();
};

export default countTimer;