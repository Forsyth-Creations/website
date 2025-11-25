// Creating objects in C++

#include <iostream>
#include <string>

class Person {
private:
    std::string name;
    int age;

public:
    Person(const std::string& name, int age) : name(name), age(age) {}

    std::string greet() const {
        return "Hello, my name is " + name + " and I am " + std::to_string(age) + " years old.";
    }
};

int main() {
    Person person("Alice", 30);
    std::cout << person.greet() << std::endl;
    return 0;
}
