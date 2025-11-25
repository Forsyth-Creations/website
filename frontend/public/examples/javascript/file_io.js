// Writing to a file in JavaScript (Node.js)

const fs = require('fs');

// Write to a file
fs.writeFileSync('output.txt', 'Hello, World!\n');
fs.appendFileSync('output.txt', 'This is a test file.\n');

// Append to a file
fs.appendFileSync('output.txt', 'Appended line.\n');

// Read from a file
const content = fs.readFileSync('output.txt', 'utf-8');
console.log(content);

// Async version
async function fileOperations() {
    const fsPromises = require('fs').promises;

    await fsPromises.writeFile('async_output.txt', 'Async Hello!\n');
    const data = await fsPromises.readFile('async_output.txt', 'utf-8');
    console.log(data);
}

fileOperations();
