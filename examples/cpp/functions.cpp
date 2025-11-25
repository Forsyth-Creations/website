// Function wrappers in C++

#include <iostream>
#include <string>
#include <functional>

// Basic function
int add(int a, int b) {
    return a + b;
}

// Function with default parameter
std::string greet(const std::string& name, const std::string& greeting = "Hello") {
    return greeting + ", " + name + "!";
}

// Function wrapper template
template<typename Func, typename... Args>
auto withLogging(const std::string& name, Func func, Args... args) {
    std::cout << "Calling " << name << std::endl;
    auto result = func(args...);
    std::cout << "Finished " << name << std::endl;
    return result;
}

int multiply(int x, int y) {
    return x * y;
}

int main() {
    std::cout << add(2, 3) << std::endl;
    std::cout << greet("Alice") << std::endl;
    std::cout << greet("Bob", "Hi") << std::endl;

    int result = withLogging("multiply", multiply, 4, 5);
    std::cout << "Result: " << result << std::endl;

    return 0;
}
