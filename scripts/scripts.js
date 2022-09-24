'use strict';
let parentElem = document.querySelector('.books');
let childrenElem = document.querySelectorAll('.book');
let advertisement = document.querySelector('.adv');
let childrenListBook2 = childrenElem[0].querySelector('ul').querySelectorAll('li');
let childrenListBook5 = childrenElem[5].querySelector('ul').querySelectorAll('li');
let childrenListBook6 = childrenElem[2].querySelector('ul').querySelectorAll('li');

//Восстановить порядок книг
parentElem.prepend(childrenElem[1]);
parentElem.append(childrenElem[2]);
childrenElem[4].after(childrenElem[3]);

//Заменить картинку заднего фона на другую из папки image

document.body.style.backgroundImage = 'url(./image/you-dont-know-js.jpg)';

//Исправить заголовок в книге 3( Получится - "Книга 3. this и Прототипы Объектов")
childrenElem[4].querySelector('a').textContent = 'Книга 3. this и Прототипы Объектов';

//Удалить рекламу со страницы
advertisement.remove();

//Восстановить порядок глав во второй и пятой книге
childrenListBook2[3].after(childrenListBook2[6]);
childrenListBook2[6].after(childrenListBook2[8]);
childrenListBook2[9].after(childrenListBook2[2]);

childrenListBook5[1].after(childrenListBook5[9]);
childrenListBook5[4].after(childrenListBook5[2]);
childrenListBook5[7].after(childrenListBook5[5]);

//в шестой книге добавить главу “Глава 8: За пределами ES6” и поставить её в правильное место
childrenElem[2].querySelector('ul').insertAdjacentHTML('beforeend', '<li>Глава 8: За пределами ES6</li>');
childrenElem[2].querySelector('ul').append(childrenListBook6[9]);



