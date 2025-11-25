// Creating objects in JavaScript

class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    greet() {
        return `Hello, my name is ${this.name} and I am ${this.age} years old.`;
    }
}

// Create an instance
const person = new Person("Alice", 30);
console.log(person.greet());

// Object literal
const car = {
    brand: "Toyota",
    model: "Camry",
    start() {
        console.log("Engine started");
    }
};

car.start();
