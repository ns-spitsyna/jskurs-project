'use strict';

let ru = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"];
let en = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let lang = ru;

if(lang == ru){
    console.log(ru)
} else {
    console.log(en)
}

switch(lang){
    case 'ru':
        console.log(ru);
        break;
    case 'en':
        console.log(en);
        break;
    default:
	    break;
}

let langArray =[ru,en]
console.log(lang == ru ? langArray[0] : langArray[1]);

let namePerson = 'Artem';
console.log(namePerson === 'Artem' ? 'директор' : namePerson === 'Max' ? 'преподаватель' : 'студент');

