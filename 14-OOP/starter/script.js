'use strict';

///////////////////////////////////////
// Constructor Functions and the new Operator
// const Person = function (firstName, birthYear) {
//   // Instance properties
//   this.firstName = firstName;
//   this.birthYear = birthYear;

//   // Never to this!
//   // this.calcAge = function () {
//   //   console.log(2037 - this.birthYear);
//   // };
// };

// const jonas = new Person('Jonas', 1991);
// console.log(jonas);

// // 1. New {} is created
// // 2. function is called, this = {}
// // 3. {} linked to prototype
// // 4. function automatically return {}

// const matilda = new Person('Matilda', 2017);
// const jack = new Person('Jack', 1975);

// console.log(jonas instanceof Person);

// Person.hey = function () {
//   console.log('Hey there 👋');
//   console.log(this);
// };
// Person.hey();

///////////////////////////////////////
// Prototypes
// console.log(Person.prototype);

// Person.prototype.calcAge = function () {
//   console.log(2037 - this.birthYear);
// };

// jonas.calcAge();
// matilda.calcAge();

// .__proto__ is the [[Prototype]] in the object, you can see it using console.log / console.dir
// console.log(jonas.__proto__);
// console.log(jonas.__proto__ === Person.prototype);

// console.log(Person.prototype.isPrototypeOf(jonas));
// console.log(Person.prototype.isPrototypeOf(matilda));
// console.log(Person.prototype.isPrototypeOf(Person));

// .prototyeOfLinkedObjects

// Person.prototype.species = 'Homo Sapiens';
// console.log(jonas.species, matilda.species);

// console.log(jonas.hasOwnProperty('firstName'));
// console.log(jonas.hasOwnProperty('species'));

///////////////////////////////////////
// Prototypal Inheritance on Built-In Objects
// console.log(jonas.__proto__);
// Object.prototype (top of prototype chain)
// console.log(jonas.__proto__.__proto__);
// console.log(jonas.__proto__.__proto__.__proto__);

// console.dir(Person.prototype.constructor);

// const arr = [3, 6, 6, 5, 6, 9, 9]; // new Array === []
// console.log(arr.__proto__);
// console.log(arr.__proto__ === Array.prototype);

// console.log(arr.__proto__.__proto__);

// Array.prototype.unique = function () {
//   return [...new Set(this)];
// };

// console.log(arr.unique());

// const h1 = document.querySelector('h1');
// console.dir(x => x + 1);

///////////////////////////////////////
// Coding Challenge #1

/* 
1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h

GOOD LUCK 😀
*/

/*
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

const bmw = new Car('BMW', 120);
const mercedes = new Car('Mercedes', 95);

bmw.accelerate();
bmw.accelerate();
bmw.brake();
bmw.accelerate();


///////////////////////////////////////
// ES6 Classes

// Class expression
// const PersonCl = class {}

// Class declaration
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // Instance methods
  // Methods will be added to .prototype property
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.fullName}`);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  // Set a property that already exists
  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name!`);
  }

  get fullName() {
    return this._fullName;
  }

  // Static method
  static hey() {
    console.log('Hey there 👋');
    console.log(this);
  }
}

const jessica = new PersonCl('Jessica Davis', 1996);
console.log(jessica);
jessica.calcAge();
console.log(jessica.age);

console.log(jessica.__proto__ === PersonCl.prototype);

// PersonCl.prototype.greet = function () {
//   console.log(`Hey ${this.firstName}`);
// };
jessica.greet();

// 1. Classes are NOT hoisted
// 2. Classes are first-class citizens
// 3. Classes are executed in strict mode

const walter = new PersonCl('Walter White', 1965);
// PersonCl.hey();


///////////////////////////////////////
// Setters and Getters
const account = {
  owner: 'Jonas',
  movements: [200, 530, 120, 300],

  get latest() {
    return this.movements.slice(-1).pop();
  },

  set latest(mov) {
    this.movements.push(mov);
  },
};

console.log(account.latest);

account.latest = 50;
console.log(account.movements);
*/

// const Person2 = function (fullName, birthYear) {
//   this.fullName = fullName;
//   this.birthYear = birthYear;
// };

// Person2.prototype.sayHello = function () {
//   console.log(
//     `Hello! My name is ${this.fullName}, and I am ${
//       2024 - this.birthYear
//     } years old`
//   );
// };

// Person2.staticHello = function () {
//   console.log('Hello world!');
//   console.log(this);
// };

// const miggy = new Person2('Miguel Pogi', 1997);
// miggy.sayHello();

// Person2.staticHello();
// console.dir(Person2);

/////////////////////////////
// Using Object.create()

// const PersonProto = {
//   calcAge() {
//     console.log(2024 - this.birthYear);
//   },

//   init(firstName, birthYear) {
//     this.firstName = firstName;
//     this.birthYear = birthYear;
//   },
// };

// // Object.create() will create a new object and set the prototype object using the object that we passed
// const steven = Object.create(PersonProto);
// steven.name = 'Steven';
// steven.birthYear = 1995;

// console.log(steven);
// steven.calcAge();

// const sara = Object.create(PersonProto);
// sara.init('Sara', 1989);
// sara.calcAge();

///////////////////////////////////////
// Coding Challenge #2

/* 
1. Re-create challenge 1, but this time using an ES6 class;
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);
4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.

DATA CAR 1: 'Ford' going at 120 km/h

GOOD LUCK 😀
*/

// class Car {
//   constructor(make, speed) {
//     this.make = make;
//     this.speed = speed; // will be kp/h
//   }

//   accelerate() {
//     this.speed += 10;
//     console.log(`${this.make} is going at ${this.speed} km/h`);
//   }

//   brake() {
//     this.speed -= 5;
//     console.log(`${this.make} is going at ${this.speed} km/h`);
//   }

//   get speedUS() {
//     return this.speed / 1.6;
//   }

//   set speedUS(speed) {
//     this.speed = speed * 1.6;
//   }
// }

// const ford = new Car('Ford', 120);
// console.log(ford.speedUS);

// ford.speedUS = 50;
// console.log(ford);

///////////////////////////////////////
// Inheritance Between "Classes": Constructor Functions

// const Person = function (firstName, birthYear) {
//   this.firstName = firstName;
//   this.birthYear = birthYear;
// };

// Person.prototype.calcAge = function () {
//   console.log(2024 - this.birthYear);
// };

// const Student = function (firstName, birthYear, course) {
//   // the this keyword in this function is the new object created when we call it using new operator
//   // As if we write the code below inside this function
//   // this.firstName = firstName;
//   // this.birthYear = birthYear;
//   Person.call(this, firstName, birthYear);

//   this.course = course;
// };

// // Student.prototype will now inherit the prototype object of Person.prototype
// // We have to created this connection here before we add any more methods to this child "class" Student
// // Object.create() WILL RETURN EMPTY OBJECT THAT HAS A PROTOTYPE OF OBJECT THAT WE PASSED
// // If we did this after we define a method in Student.prototype, then this Object.create will overwrite this Student.prototype into a new empty object
// Student.prototype = Object.create(Person.prototype);

// Student.prototype.introduce = function () {
//   console.log(`My name is ${this.firstName} and I study ${this.course}`);
// };

// // And then we need to set the constructor of Student.prototype to Student itself because the objects.__proto__ created by the Student constructor function should be pointed to Student
// Student.prototype.constructor = Student;

// const mike = new Student('Mike', 2010, 'Computer Science');

// mike.introduce();
// // NOW THIS WILL WORK DUE TO "CLASS" INHERITANCE (Inheriting the methods of the parent class)
// mike.calcAge();

///////////////////////////////////////
// Coding Challenge #3

/* 
1. Use a constructor function to implement an Electric Car (called EV) as a CHILD "class" of Car. Besides a make and current speed, the EV also has the current battery charge in % ('charge' property);
2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo';
3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%';
4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'! HINT: Review the definiton of polymorphism 😉

DATA CAR 1: 'Tesla' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/

// ES5 OOP Funciton constructor with inheritance between "classes"
// const Car = function (make, speed) {
//   this.make = make;
//   this.speed = speed;
// };

// Car.prototype.accelerate = function () {
//   this.speed += 10;

//   console.log(`${this.make} is going at ${this.speed} km/h`);
// };

// Car.prototype.brake = function () {
//   this.speed -= 5;
//   console.log(`${this.make} is going at ${this.speed} km/h`);
// };

// const EV = function (make, speed, charge) {
//   Car.call(this, make, speed);
//   this.charge = charge;
// };

// // Set the EV.prototype to empty object with prototype of Car.prototype
// EV.prototype = Object.create(Car.prototype);
// EV.prototype.constructor = EV;

// EV.prototype.chargeBattery = function (chargeTo) {
//   this.charge = chargeTo;
// };

// This is polymorphism
// EV.prototype.accelerate = function () {
//   this.speed += 20;
//   this.charge--;

//   console.log(
//     `${this.make} is going at ${this.speed} km/h with a charge of ${this.charge}%`
//   );
// };

// const tesla = new EV('Tesla', 120, 23);
// tesla.accelerate();
// tesla.brake();
// tesla.chargeBattery(90);

///////////////////////////////////////
// Inheritance Between "Classes": ES6 Classes

// class PersonCl {
//   constructor(fullName, birthYear) {
//     this.fullName = fullName;
//     this.birthYear = birthYear;
//   }

//   // Instance methods
//   // Methods will be added to .prototype property
//   calcAge() {
//     console.log(2037 - this.birthYear);
//   }

//   greet() {
//     console.log(`Hey ${this.fullName}`);
//   }

//   get age() {
//     return 2037 - this.birthYear;
//   }

//   // Set a property that already exists
//   set fullName(name) {
//     if (name.includes(' ')) this._fullName = name;
//     else alert(`${name} is not a full name!`);
//   }

//   get fullName() {
//     return this._fullName;
//   }

//   // Static method
//   static hey() {
//     console.log('Hey there 👋');
//     console.log(this);
//   }
// }

// // extends will link the prototype behind the scenes
// class StudentCl extends PersonCl {
//   // This constructor is OPTIONAL
//   // No need to set the constructor and super if we don't need to set new properties
//   // if we want to create a property that follows the parent class and set the this keyword with super
//   constructor(fullName, birthYear, course) {
//     // NEED TO HAPPEN FIRST, because this call to super function is responsible for creating the this keyword in this sub-class
//     // super is equal to Person.call(this, fullName, birthYear) and also sets the this keyword to the class itself
//     super(fullName, birthYear);
//     this.course = course;
//   }

//   introduce() {
//     console.log(`My name is ${this.fullName} and I study ${this.course}`);
//   }

//   // This is polymorphism in "class"
//   calcAge() {
//     console.log(
//       `I'm ${
//         2024 - this.birthYear
//       } years old, but as a student i feel like more like ${
//         2024 - this.birthYear + 10
//       }`
//     );
//   }
// }

// const martha = new StudentCl('Martha Jones', 2008, 'Computer Science');
// // const martha = new StudentCl('Martha Jones', 2008);

// martha.introduce();
// martha.calcAge();

///////////////////////////////////////
// Inheritance Between "Classes": Object.create

// const PersonProto = {
//   calcAge() {
//     console.log(2037 - this.birthYear);
//   },

//   init(firstName, birthYear) {
//     this.firstName = firstName;
//     this.birthYear = birthYear;
//   },
// };

// const StudentProto = Object.create(PersonProto); // will return an object with proto already set

// StudentProto.init = function (firstName, birthYear, course) {
//   PersonProto.init.call(this, firstName, birthYear);
//   this.course = course;
// };

// StudentProto.introduce = function () {
//   console.log(`My name is ${this.firstName} and I study ${this.course}`);
// };

// const jay = Object.create(StudentProto); // will return an object with proto already set
// jay.init('Jay', 2010, 'Computer Bullshit');
// jay.introduce();
// jay.calcAge();

///////////////////////////////////////
// Encapsulation: Protected Properties and Methods
// Encapsulation: Private Class Fields and Methods

// 1) Public fields
// 2) Private fields
// 3) Public methods
// 4) Private methods
// (there is also the static version)

// class Account {
//   // 1) Public fields (will carry in each instance)
//   locale = navigator.language;

//   // 2) Private fields
//   #movements = [];
//   #pin; // no value at first, then we define it in constructor method

//   constructor(owner, currency, pin) {
//     this.owner = owner;
//     this.currency = currency;

//     // Use _ to fake encapsulation (Protected property and method). This is just a convention
//     this.#pin = pin;
//     // this._movements = []; // not based on any inputs
//     // this.locale = navigator.language; // not based on any inputs

//     console.log(`Thanks for opening an account, ${owner}`);
//   }

//   // 3) Public methods
//   // Public interface
//   getMovements() {
//     return this.#movements;
//   }

//   deposit(val) {
//     this.#movements.push(val);
//     return this; // return the object for chain method
//   }

//   withdrawal(val) {
//     this.deposit(-val);
//     return this;
//   }

//   _approveLoan(val) {
//     return true;
//   }

//   requestLoan(val) {
//     // if (this.#approveLoan()) {
//     if (this._approveLoan()) {
//       this.deposit(val);
//       console.log(`Loan approved`);
//       return this;
//     }
//   }

//   static helper() {
//     console.log('Helper');
//   }

//   // 4) Private methods
//   #approveLoan(val) {
//     return true;
//   }
// }

// const acc1 = new Account('Jonas', 'EUR', 1111);
// acc1.deposit(250);
// acc1.withdrawal(140);
// acc1.requestLoan(500);
// console.log(acc1.getMovements());
// // console.log(acc1.#movements); // won't work because the movement field is private
// // console.log(acc1.#pin); // won't work because the pin field is private
// // console.log(acc1.#approveLoan(1000)); // won't work because the pin field is private

// Account.helper();

// // Chaining
// acc1
//   .deposit(1000)
//   .deposit(2000)
//   .withdrawal(1500)
//   .requestLoan(5000)
//   .withdrawal(3000);

///////////////////////////////////////
// Coding Challenge #4

/* 
1. Re-create challenge #3, but this time using ES6 classes: create an 'EVCl' child class of the 'CarCl' class
2. Make the 'charge' property private;
3. Implement the ability to chain the 'accelerate' and 'chargeBattery' methods of this class, and also update the 'brake' method in the 'CarCl' class. They experiment with chining!

DATA CAR 1: 'Rivian' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/

// class Car {
//   constructor(make, speed) {
//     this.make = make;
//     this.speed = speed;
//   }

//   accelerate() {
//     this.speed += 10;

//     console.log(`${this.make} is going at ${this.speed} km/h`);
//   }

//   brake() {
//     this.speed -= 5;
//     console.log(`${this.make} is going at ${this.speed} km/h`);
//     return this;
//   }

//   get speedUS() {
//     return this.speed / 1.6;
//   }

//   set speedUS(speed) {
//     this.speed = speed * 1.6;
//   }
// }

// class EV extends Car {
//   // Private field
//   #charge;

//   constructor(make, speed, charge) {
//     super(make, speed);
//     this.#charge = charge;
//   }

//   chargeBattery(chargeTo) {
//     this.#charge = chargeTo;
//     return this;
//   }

//   accelerate() {
//     this.speed += 20;
//     this.#charge--;

//     console.log(
//       `${this.make} is going at ${this.speed} km/h with a charge of ${
//         this.#charge
//       }%`
//     );

//     return this;
//   }
// }

// const tesla = new EV('Tesla', 120, 23);
// tesla
//   .accelerate()
//   .accelerate()
//   .chargeBattery(100)
//   .accelerate()
//   .accelerate()
//   .brake();
