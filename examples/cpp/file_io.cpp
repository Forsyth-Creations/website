// Writing to a file in C++

#include <iostream>
#include <fstream>
#include <string>

int main() {
    // Write to a file
    std::ofstream outFile("output.txt");
    if (outFile.is_open()) {
        outFile << "Hello, World!" << std::endl;
        outFile << "This is a test file." << std::endl;
        outFile.close();
    }

    // Append to a file
    std::ofstream appendFile("output.txt", std::ios::app);
    if (appendFile.is_open()) {
        appendFile << "Appended line." << std::endl;
        appendFile.close();
    }

    // Read from a file
    std::ifstream inFile("output.txt");
    if (inFile.is_open()) {
        std::string line;
        while (std::getline(inFile, line)) {
            std::cout << line << std::endl;
        }
        inFile.close();
    }

    return 0;
}
