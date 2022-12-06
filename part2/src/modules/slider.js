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

export default slider;