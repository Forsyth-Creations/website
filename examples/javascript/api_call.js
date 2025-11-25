// Calling a remote API in JavaScript

async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error:", error.message);
        return null;
    }
}

// Example: Fetch a user from JSONPlaceholder API
const url = "https://jsonplaceholder.typicode.com/users/1";

fetchData(url).then(user => {
    if (user) {
        console.log(`Name: ${user.name}`);
        console.log(`Email: ${user.email}`);
    }
});
