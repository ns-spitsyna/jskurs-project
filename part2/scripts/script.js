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
    countTimer('30 oct 2022');

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
            } else if(target.closest('menu ul>li')) {
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

    // Slider

    const slider = () => {
        const slide = document.querySelectorAll('.portfolio-item'),
            slider = document.querySelector('.portfolio-content'),
            parentDots = document.querySelector('.portfolio-dots');

        let currentSlide = 0,
            dot = document.querySelectorAll('.dot'),
            interval;

            for(let i = 0; i < slide.length; i++) {
                let child = document.createElement('li');
                if(i === 0) {
                    child.classList = 'dot dot-active';
                } else {
                    child.classList = 'dot';
                }
                parentDots.appendChild(child);
            }

            dot = document.querySelectorAll('.dot');

        const prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        }

        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        }

        const autoPlaySlide = () => {
            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');
            currentSlide++;
            if(currentSlide >= slide.length) currentSlide = 0;
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        }

        const startSlide = (time = 1500) => {
            interval = setInterval(autoPlaySlide, time);
        }

        const stopSlide = () => {
            clearInterval(interval);

        };

        slider.addEventListener('click', (event) => {
            event.preventDefault();
            let target = event.target;

            if(!target.matches('.portfolio-btn,.dot')) return;

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');
            if(target.matches('#arrow-right')) {
                currentSlide++;
            } else if (target.matches('#arrow-left')) {
                currentSlide--;
            } else if (target.matches('.dot')) {
                dot.forEach((elem, index) => {
                    if(elem === target) {
                        currentSlide = index;
                    }
                });
            }

            if(currentSlide >= slide.length) currentSlide = 0;
            if(currentSlide < 0) currentSlide = slide.length - 1;

            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        });

        slider.addEventListener('mouseover', (event) => {
            if(event.target.matches('.portfolio-btn') ||
            event.target.matches('.dot')){
                stopSlide();
            }
        });

        slider.addEventListener('mouseout', (event) => {
            if(event.target.matches('.portfolio-btn') ||
            event.target.matches('.dot')){
                startSlide();
            }
        });
        startSlide();
    };

    slider();

    // our team

    const togglePhoto = () => {
        const commandPhoto = document.querySelectorAll('.command__photo');
        commandPhoto.forEach(item => {
            item.addEventListener('mouseover', event => event.target.src = event.target.dataset.img);
            item.addEventListener('mouseout', event =>  event.target.src = item.src);
        });
    };
    togglePhoto();

    // Calculate the cost
    const formValidation = (elem) => {
        let valueElement = document.querySelector(elem);
        valueElement.addEventListener('input', () => {
            valueElement.value = valueElement.value.replace(/\D/g, '');
        });
    };

    formValidation('.calc-square');
    formValidation('.calc-count');
    formValidation('.calc-day');

    const calc = (price = 100) => {
        const calcBlock = document.querySelector('.calc-block'),
            calcType = document.querySelector('.calc-type'),
            calcSquare = document.querySelector('.calc-square'),
            calcDay = document.querySelector('.calc-day'),
            calcCount = document.querySelector('.calc-count'),
            totalValue = document.getElementById('total');

        const countSum = () =>{
            let total = 0,
                countValue = 1,
                dayValue = 1;

            const typeValue = +calcType.options[calcType.selectedIndex].value,
                squareValue = +calcSquare.value;
            if(calcCount.value > 1) {
                countValue += (calcCount.value - 1) / 10;
            }

            if(calcDay.value && calcDay.value < 5) {
                dayValue *= 2;
            } else if(calcDay.value && calcDay.value < 10) {
                dayValue *= 1.5;
            }

            if(typeValue && squareValue) {
                total = price * typeValue * squareValue * countValue * dayValue;
            }

            totalValue.textContent = total;
        };

        calcBlock.addEventListener('change', (event) => {
            const target = event.target;
            if(target.matches('select') || target.matches('input')) {
                countSum();
            }
        });
    };

    calc(100);

    //send-ajax-form

    const sendForm = (formId) => {
        const errorMessage = 'Что-то пошло не так ...',
            loadMessage = 'Загрузка...',
            successMessage ='Спасибо! Мы скоро с вами свяжемся!',
            form = document.getElementById(formId);

            const statusMessage = document.createElement('div');
            statusMessage.style.cssText = 'font-size: 2rem; color: white';

            form.addEventListener('submit', (event) => {
                event.preventDefault();
                form.appendChild(statusMessage);
                statusMessage.textContent = loadMessage;

                const formData = new FormData(form);
                let body = {};
                formData.forEach((value, key) => {
                    if(value !== '') {
                        body[key] = value;
                    }
                });

                postData(body)
                    .then(() => {
                        statusMessage.textContent = successMessage;
                        form.reset();
                    })
                    .catch(error => {
                        statusMessage.textContent = errorMessage;
                        console.error(error);
                    });

            });

            const postData = (body) => {
                return new Promise((resolve, reject) => {
                    const request = new XMLHttpRequest();
                    request.addEventListener('readystatechange', () => {

                        if(request.readyState !== 4) {
                            return;
                        }
                        if(request.status === 200) {
                            resolve();
                        } else {
                            reject(request.status);
                        }

                    });

                    request.open('POST','./server.php' );
                    //настройка заголовков
                    request.setRequestHeader('Content-Type', 'application/json');

                    //открываем соединение и отправляем данные
                    if(Object.keys(body).length !== 0) {
                        request.send(JSON.stringify(body));
                    }
                })
            }
    };
    sendForm('form1');
    sendForm('form2');
    sendForm('form3');
});

class SliderCarousel {
    constructor({
        main,
        wrap,
        next,
        prev,
        infinity = false,
        position = 0,
        slidesToShow = 3,
        responsive = [],
    }) {
        if(!main || !wrap) {
            console.warn('slider-carousel: Необходимо 2 свойства: main и wrap');
        }
        this.main = document.querySelector(main);
        this.wrap = document.querySelector(wrap);
        this.slides = document.querySelector(wrap).children;
        this.next = document.querySelector(next);
        this.prev = document.querySelector(prev);
        this.slidesToShow = slidesToShow;
        this.responsive = responsive;
        this.options = {
            position,
            infinity,
            maxPosition: this.slides.length - this.slidesToShow,
            widthSlide: Math.floor(100 / this.slidesToShow),
        };
    }
    init() {
        this.addGloClass();
        this.addStyle();
        if(this.prev && this.next) {
            this.controlSlider();
        } else {
            this.addArrow();
            this.controlSlider();
        }
        if(this.responsive) {
            this.responseInit();
        }
    }

    addGloClass() {
        this.main.classList.add('glo-slider');
        this.wrap.classList.add('glo-slider__wrap');
        for(const item of this.slides) {
            item.classList.add('glo-slider__item');
        }
    }

    controlSlider() {
        this.prev.addEventListener('click', this.prevSlider.bind(this));
        this.next.addEventListener('click', this.nextSlider.bind(this));
    }

    prevSlider() {
        if(this.options.infinity || this.options.position > 0) {
            --this.options.position;
            if(this.options.position < 0) {
                this.options.position = this.options.maxPosition;
            }
            this.wrap.style.transform =
                `translateX(-${this.options.position * this.options.widthSlide}%)`;
        }
    }

    nextSlider() {
        if(this.options.infinity || this.options.position < this.options.maxPosition) {
            ++this.options.position;

            if(this.options.position > this.options.maxPosition) {
                this.options.position = 0;
            }
            this.wrap.style.transform =
                `translateX(-${this.options.position * this.options.widthSlide}%)`;
        }
    }

    addArrow() {
        this.prev = document.createElement('button');
        this.next = document.createElement('button');
        this.prev.className = 'glo-slider__prev';
        this.next.className = 'glo-slider__next';
        this.main.appendChild(this.prev);
        this.main.appendChild(this.next);
    }

    addStyle() {
        let style = document.getElementById('style');
        if(!style) {
            const style = document.createElement('style');
            style.id = 'sliderCarousel-style';
            style.textContent = `
            .glo-slider {
                overflow: hidden!important;
            }
            .glo-slider__wrap {
                display: flex!important;
                transition: transform 0.5s!important;
                will-change: transform!important;
            }
            .glo-slider__item {
                display: flex!important;
                align-items: center!important;
                justify-content: center!important;
                flex: 0 0 ${this.options.widthSlide}%!important;
                margin: auto 0!important;
            }
            .glo-slider__prev,
            .glo-slider__next {
                margin: 0 10px;
                border: 20px solid transparent;
                background: transparent;
            }
            .glo-slider__next {
                border-left-color: #19b5fe;
            }
            .glo-slider__prev {
                border-right-color: #19b5fe;
            }
            .glo-slider__prev:hover,
            .glo-slider__prev:focus,
            .glo-slider__next:hover,
            .glo-slider__next:focus {
                outline: none;
                background: transparent;
            }
            input.success {
                background-color: #d2e9d2;
            }

            input.error {
                background-color: #f9a4a4;
            }

            .validator-error {
                font-size: 12px;
                color: red;
            }

            #form1 .validator-error {
                transform: translateY(-3rem);
            }

            .popup .validator-error {
                transform: translateY(0.5rem);
            }

            .footer-form .validator-error {
                transform: translateY(0);
            }
            `;
        document.head.appendChild(style);
        }
    }

    responseInit() {
        const slidesToShowDefault = this.slidesToShow,
            allResponse = this.responsive.map(item => item.breakpoint),
            maxResponse = Math.max(...allResponse);
        const checkResponse = () => {
            const widthWindow = document.documentElement.clientWidth;
            if(widthWindow < maxResponse) {
                for(let i = 0; i < allResponse.length; i++) {
                    if(widthWindow < allResponse[i]) {
                        this.slidesToShow = this.responsive[i].slidesToShow;
                        this.options.widthSlide = Math.floor(100 / this.slidesToShow);
                        this.addStyle();
                    }
                }
            } else {
                this.slidesToShow = slidesToShowDefault;
                this.options.widthSlide = Math.floor(100 / this.slidesToShow);
                this.addStyle();
            }
        }
        checkResponse();
        window.addEventListener('resize', checkResponse);
    }
}

