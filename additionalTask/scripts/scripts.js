'use strict';
//1
let arr = [];
arr = ['22522', '44444', '35688', '111223', '994741', '456987', '4567892'];
console.log(arr);
for(let i = 0; i < arr.length; i++) {
    if(arr[i].slice(0, 1) == '2' || arr[i].slice(0, 1) == '4') console.log(arr[i]);
}

//2

for(let n = 2; n < 100; n++) {
    if(isNatural(n)) {
        console.log(`Делители этого числа: 1 и ${n}`);
    }
}

function isNatural(number) {
    for (let i = 2; i <= number/2; i++) {
        if (number % i == 0) {
            return false;
        }
    }
    return true;
}