"use strict";

// the cheater way
var reduce = Function.call.bind(Array.prototype.reduce);

// actually applying some thought -- this function differs slightly from borrowing Array's prototype by switching the placement of the fn and collection parameters
var reduce = function(fn, collection, startingAcc) {
    let acc = undefined;
    let j = 0;

    if(startingAcc) {
        acc = startingAcc;
    } else {
        acc = collection[0];
        j = 1;
    }

    for(null; j < collection.length; j++) {
        acc = fn(acc, collection[j]);
    }

    return acc;
};

// we'll test with a simple sum example
let sum = (acc, x) => x + acc;
reduce(sum, [1,2,3]); // 6

// let's use reduce to create our own map function
let map = (fn, collection) => reduce((acc, x) => acc.concat(fn(x)), collection, []);

// and once again will test with a simple addition function
let addOne = (a) => a + 1;
map(addOne, [0,1,2]); // [1,2,3]

// finally, let's implement filter
let filter = (fn, collection) => reduce((acc, x) => {
    return fn(x) ? acc.concat(x) : acc;
}, collection, []);

// and a simple test looking for even numbers
let isEven = (n) => (n % 2) === 0;
filter(isEven, [1,2,3,4,5,6]); // [2,4,6]
