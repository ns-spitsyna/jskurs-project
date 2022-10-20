window.addEventListener('DOMContentLoaded', function() {
    'use strict';
    // Timer
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
    }
    countTimer('21 oct 2022');

    //Menu
    const scrollDown = (blockId) => {
        const scrollBlockId = blockId.getAttribute('href');
            const scrollBlock = document.querySelector(scrollBlockId).getBoundingClientRect();
            window.scroll({left: scrollBlock.left, top: scrollBlock.top, behavior: 'smooth'});
    };

    const toggleMenu = () => {
        const btnMenu = document.querySelector('.menu'),
            menu = document.querySelector('menu'),
            closeBtn = document.querySelector('.close-btn'),
            menuItems = document.querySelectorAll('ul>li');
            const handlerMenu = () => {
                menu.classList.toggle('active-menu');
            };

        btnMenu.addEventListener('click', handlerMenu);

        closeBtn.addEventListener('click', handlerMenu);
        menuItems.forEach(item => item.addEventListener('click', (event) => {
            handlerMenu();
            event.preventDefault();
            scrollDown(event.target);
        }));

    };
    toggleMenu();

    //Popup

    const togglePopup = () => {
        const popup = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn'),
            popupClose = document.querySelector('.popup-close');

            popupBtn.forEach(elem => {
                elem.addEventListener('click', () => {
                    popup.style.display = 'block';
                });
            });

            popupClose.addEventListener('click', () => {
                popup.style.display = 'none';
            });
    };
    togglePopup();

    //Button down
    const scrollNextBtn = document.querySelector('.scroll-next-btn');
    scrollNextBtn.addEventListener('click', (event) => {
        event.preventDefault();
        scrollDown(scrollNextBtn);
    });
});