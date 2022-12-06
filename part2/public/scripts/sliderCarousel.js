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
};
