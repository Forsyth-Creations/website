// Control flow in JavaScript

// If statement
const value = 10;
if (value > 0) {
    console.log("Positive");
} else if (value < 0) {
    console.log("Negative");
} else {
    console.log("Zero");
}

// Switch statement
const status = "success";
switch (status) {
    case "success":
        console.log("Operation succeeded");
        break;
    case "error":
        console.log("Operation failed");
        break;
    default:
        console.log("Unknown status");
}

// For loop
for (let i = 0; i < 5; i++) {
    console.log(`Iteration ${i}`);
}

// While loop
let count = 0;
while (count < 3) {
    console.log(`Count: ${count}`);
    count++;
}
