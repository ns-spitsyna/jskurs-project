'use strict';

let week = ["Воскресенье","Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];

let currentDay = new Date();

week.splice(0,1);
week.splice(6,1,'Воскресенье');

for (let i = 0; i < week.length; i++) {
    if(i === 5 || i === 6) {
        document.write('<i>' + week[i]+'</i><br>');
    } else if (i === currentDay.getDay()-1) {
        document.write('<strong>' + week[i]+'</strong><br>');
    } else {
        document.write(week[i]+'<br>');
    }
}


