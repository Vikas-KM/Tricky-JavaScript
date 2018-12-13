//* Notes Made during Javascipt Fine tuning and learning

//! #1
var text = null;
console.log(typeof text);   // prints object

//! #2
var text;
console.log(typeof text);   // prints undefined

//! #3
var text = 'outside';
function logIt(){
    console.log(text);
    var text = 'inside';
}
logIt();    //prints undefined

//! #4
var height = '';
if(height)
    console.log(typeof height);
else
    console.log('Its falsy value'); //this gets printed
//typeof height is string thou
// undefined NaN '' 0 null are all falsy values

//! #5
// difference between function expression and function declaration
//function declaration
//*    function whatDoYouDo(job, name){}
//function expression
//*    var whatDoYouDo = function(job,name);
//whatDoYouDo('teacher','vikas); // calling the above function expression

//! #6
//variable names start with _ and $

//! #7
var names = [1,2,3];
names[5] = 5;
console.log(names[3], names[4]);    //prints undefined

//! #8
function foo1(){
    return {
        bar:'hello'
    };
}

function foo2(){
    return      // return is empty hence undefined
    {
        bar:'hello'
    };
}
console.log(foo1());    // bar object
console.log(foo2());    // undefined

//! #9
//Difference between setTimeOut and setInterval
//setTimeout = allows to run a function once after the interval of time.
//setInterval = allows to run a function regularly with the interval between the runs.

//! #10
if(1){
    let name='John';
}
console.log(name);  // ReferenceError: name is not defined

//! #11
function fn(number=compare, compare=10){
	console.log(number,compare);
}

fn();	//ReferenceError: compare is not defined

//! #12
function fn(number=10, compare){
	console.log(number,compare);
}

fn(10);	//10 undefined
fn(undefined,10);	//10 10

//! 13
let name='John';
let age=30;

let obj = {
	name,
	age
};

console.log(obj.name, obj.age);	//John 30

//! 14
let name='John';
let age=35;

let obj = {
	"name":'JohnDoe',
	"age":27
};

console.log(obj['name'], obj.age);	//JohnDoe 35 // look at the console log syntax

//! 15
let numbers = [1,2,3];
[a,b,c,d] = numbers;
[e,...f] = numbers

console.log(a,b,c);	// 1 2 3
console.log(d);	// undefined

console.log(e);	// 1
console.log(f); // [ 2, 3 ]
[g, , h] = numbers;	// no let required

//! #16
let obj = {
	name:'vikas',
	age: 35,
	greet: function(){
		console.log('Hello');
	}
};

// let {name,age} = obj;	//let is required here
//let {name, ,greet} = obj;	//! Unexpected token , doesnt work
// let {name, greet} = obj;	// call greet() and it prints hello
let {name, greet:hello} = obj;	// assigns greet to hello
hello(); // prints hello
greet(); // doesnt work, gives error

//! #17
let symbol = Symbol('debug');
let anotherSymbol = Symbol('debug');

console.log(symbol);    //Symbol(debug)
console.log(symbol == anotherSymbol);   //false

//! #18
let symbol1 = Symbol.for('age');
let symbol2 = Symbol.for('age');

console.log(symbol1 == symbol2); // prints true

//! #19
let numbers = [1,2,3];
let it = numbers[Symbol.iterator]();

console.log(it.next());  // done:false value:1
console.log(it.next());  // done:false value:2
console.log(it.next());  // done:false value:3
console.log(it.next()); //  done:true value:undefined

//! #20
let numbers = [1,2,3];

numbers[Symbol.iterator] = function(){
    let nextValue = 10;
    return{
        next: function(){
            nextValue++;
            return{
                done: nextValue > 15 ? true : false,
                value: nextValue
            };
        }
    };
}

for (let element of numbers){
    console.log(element);    //11,12,13,14,15
}

//! #21
let person = {
    name:'John',
    hobbies:['walking','sudoku','reading','watching movies'],
    [Symbol.iterator]: function(){
        let i =0;
        hobbies = this.hobbies;
        return{
            next:function(){
                let value = hobbies[i];
                i++;
                return{
                    done: i > hobbies.length ? true: false,
                    value: value
                }
            }
        }
    }
}

for(let hobby of person){
    console.log(hobby); //  walking   sudoku    reading    watching movies
}

//! #22
function *select(){
    yield 'John';
    yield 'Doe';
}

let it = select();
console.log(it.next()); //{ value: 'John', done: false }
console.log(it.next()); //{ value: 'Doe', done: false }
console.log(it.next()); //{ value: undefined, done: true }

//! #23
let promise = new Promise(function(resolve, reject){
    setTimeout(function(){
        resolve('Promise is resolved');
        reject('Promise Failed!!!');
    },2000);
});

promise.then(function(value){
    console.log(value); //Promise is resolved
},function(error){
    console.log(error); //Promise Failed!!!
})

//! #24
function waitASec(seconds){
    return new Promise(function(resolve, reject){
        if(seconds > 2){
            reject('Rejected!!');
        }else{
            setTimeout(function(){
                seconds++;
                resolve(seconds);
            },1000);        
        }
        
    });
}

waitASec(2)
    .then(waitASec)
    .then(function(seconds){
        console.log(seconds);
    })
    .catch(function(error){
        console.log(error);     //Rejected
    })

waitASec(1)
.then(waitASec)
.then(function(seconds){
    console.log(seconds);
})
.catch(function(error){
    console.log(error);     //3
})

waitASec(0)
.then(waitASec)
.then(function(seconds){
    console.log(seconds);
})
.catch(function(error){
    console.log(error);     //2
})

//! #25
let arr = Array(5);
console.log(arr);   //[ <5 empty items> ]

let arr1 = Array.of(5);
console.log(arr1);  //[ 5 ]

//! #26
let arr = [1,2,3,4,5];
console.log(arr);   //[ 1, 2, 3, 4, 5 ]
let newArr = Array.from(arr, val => val *2);
console.log(newArr);    //[ 2, 4, 6, 8, 10 ]

//! #27
let arr = [1,2,3,4,5];
console.log(arr);   //[ 1, 2, 3, 4, 5 ]
let newArr = Array.from(arr);
console.log(newArr);    //[ 1, 2, 3, 4, 5 ]
newArr.push(1);
console.log(newArr);    //[ 1, 2, 3, 4, 5, 1 ]

//! #28
let num = 10 || 12;     //In OR if first value is true then its done
console.log(num);   // 10
num = 10 && 12;         //In AND it goes till the last value
console.log(num);   // 12

//! #29
let arr = [1,2,3,4,5];
let anotherArr = arr;
// arr = [];
// console.log(arr);           //[]
// console.log(anotherArr);    //[ 1, 2, 3, 4, 5 ]

arr.length = 0;
console.log(arr);           //[]
console.log(anotherArr);    //[]

arr.splice(0, arr.length);   //[]

//! #30
//How to find if the it is Array or Object
var obj = {};
var arr = [];
console.log(Array.isArray(obj));
console.log(Array.isArray(arr));

// if obj is Array returns true;
// else it returns false;

//! #31
var x =1;
var output = (function() {
    delete x;
    return x;
  })();
  
console.log(output); //Expected 1
//learn where delete is used

//! #32
var output = (function(x) {
    delete x;
    return x;
    })(0);
  
console.log(output); //Expected 1
// learn when delete is used