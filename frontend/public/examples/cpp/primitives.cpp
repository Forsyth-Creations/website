// Defining primitives in C++

#include <iostream>
#include <string>
#include <vector>
#include <array>

int main() {
    // Integer types
    int age = 25;
    long count = 100L;
    unsigned int positiveOnly = 42;

    // Floating point types
    float temperature = 98.6f;
    double precise = 3.14159265359;

    // Character and string
    char letter = 'A';
    std::string name = "Alice";

    // Boolean
    bool isActive = true;

    // Array
    int numbers[5] = {1, 2, 3, 4, 5};
    std::array<int, 5> stdArray = {1, 2, 3, 4, 5};

    // Vector
    std::vector<int> items = {1, 2, 3};
    items.push_back(4);

    // Pointer
    int* ptr = &age;

    std::cout << "Name: " << name << ", Age: " << age << ", Active: " << isActive << std::endl;
    return 0;
}
