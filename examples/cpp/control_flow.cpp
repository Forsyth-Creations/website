// Control flow in C++

#include <iostream>

int main() {
    // If statement
    int value = 10;
    if (value > 0) {
        std::cout << "Positive" << std::endl;
    } else if (value < 0) {
        std::cout << "Negative" << std::endl;
    } else {
        std::cout << "Zero" << std::endl;
    }

    // Switch statement
    int status = 1;
    switch (status) {
        case 1:
            std::cout << "Operation succeeded" << std::endl;
            break;
        case 2:
            std::cout << "Operation failed" << std::endl;
            break;
        default:
            std::cout << "Unknown status" << std::endl;
    }

    // For loop
    for (int i = 0; i < 5; i++) {
        std::cout << "Iteration " << i << std::endl;
    }

    // While loop
    int count = 0;
    while (count < 3) {
        std::cout << "Count: " << count << std::endl;
        count++;
    }

    return 0;
}
