'use strict';

function stringTrim(elem){
    if(typeof elem != 'string') alert('Not string!');
    let text = elem.trim();

    return text.length > 30 ? text.slice(0, 30) + '...' : text
}

console.log(stringTrim('     1234567 8111111 7892 234567890 5555555 555         '));