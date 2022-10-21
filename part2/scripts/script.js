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
        const menu = document.querySelector('menu'),
            body = document.body;

            const handlerMenu = () => {
                menu.classList.toggle('active-menu');
            };

        body.addEventListener('click', (event) => {
            let target = event.target;
            if(target.closest('.menu') || target.closest('.close-btn')) {
                handlerMenu();
            } else if(target.closest('ul>li')) {
                handlerMenu();
                event.preventDefault();
                scrollDown(event.target);
            } else {
                target = target.closest('menu');
                if(!target){
                    menu.classList.remove('active-menu');
                }
            }
        });
    };
    toggleMenu();

    //Popup

    const togglePopup = () => {
        const popup = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn');

        popupBtn.forEach(elem => {
            elem.addEventListener('click', () => {
                popup.style.display = 'block';
            });
        });

        popup.addEventListener('click', (event) => {
            let target = event.target;
            if(target.classList.contains('popup-close')) {
                popup.style.display = 'none';
            } else {
                target = target.closest('.popup-content');
                if(!target){
                    popup.style.display = 'none';
                }
            }
        });
    };
    togglePopup();

    //Button down
    const scrollNextBtn = document.querySelector('.scroll-next-btn');
    scrollNextBtn.addEventListener('click', (event) => {
        event.preventDefault();
        scrollDown(scrollNextBtn);
    });

    //Tabs

    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
            tab = tabHeader.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');

        const toggleTabContent = (index) => {
            for(let i = 0; i < tabContent.length; i++) {
                if(index === i) {
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                } else {
                    tab[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');
                }
            }

        };

        tabHeader.addEventListener('click', (event) => {
            let target = event.target;
            target = target.closest('.service-header-tab');

            if(target) {
                tab.forEach((item, i) => {
                    if(item === target) toggleTabContent(i);
                });
            }
        })
    }
    tabs();
});
