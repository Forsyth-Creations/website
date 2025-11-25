// Function wrappers in JavaScript

// Basic function
function add(a, b) {
    return a + b;
}

// Arrow function with default parameter
const greet = (name, greeting = "Hello") => {
    return `${greeting}, ${name}!`;
};

// Higher-order function (function wrapper/decorator)
function withLogging(fn) {
    return function(...args) {
        console.log(`Calling ${fn.name}`);
        const result = fn(...args);
        console.log(`Finished ${fn.name}`);
        return result;
    };
}

function multiply(x, y) {
    return x * y;
}

const loggedMultiply = withLogging(multiply);

// Usage
console.log(add(2, 3));
console.log(greet("Alice"));
console.log(loggedMultiply(4, 5));
