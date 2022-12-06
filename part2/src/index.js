import '@babel/polyfill';
import 'nodelist-foreach-polyfill';
import elementClosest from 'element-closest';
elementClosest(window);
import 'formdata-polyfill';
require('es6-promise').polyfill();

import countTimer from './modules/countTimer';
import calc from './modules/calc';
import formValidation from './modules/formValidation';
import sendForm from './modules/sendForm';
import slider from './modules/slider';
import tabs from './modules/tabs';
import togglePopup from './modules/togglePopup';
import toggleMenu from './modules/toggleMenu';
import togglePhoto from './modules/togglePhoto';

window.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // Timer
    countTimer('12 nov 2022');

    //Menu
    toggleMenu();

    //Popup
    togglePopup();

    //Button down
    const scrollNextBtn = document.querySelector('.scroll-next-btn');
    scrollNextBtn.addEventListener('click', (event) => {
        event.preventDefault();
        scrollDown(scrollNextBtn);
    });

    //Tabs
    tabs();

    // Slider
    slider();

    // our team
    togglePhoto();

    // Calculate the cost
    formValidation('.calc-square');
    formValidation('.calc-count');
    formValidation('.calc-day');

    calc(100);

    //send-ajax-form
    sendForm('form1');
    sendForm('form2');
    sendForm('form3');
});