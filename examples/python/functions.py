# Function wrappers in Python
import functools

# Basic function
def add(a, b):
    return a + b

# Function with default parameters
def greet(name, greeting="Hello"):
    return f"{greeting}, {name}!"

# Decorator (function wrapper)
def logger(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        print(f"Calling {func.__name__}")
        result = func(*args, **kwargs)
        print(f"Finished {func.__name__}")
        return result
    return wrapper

@logger
def multiply(x, y):
    return x * y

# Usage
print(add(2, 3))
print(greet("Alice"))
print(multiply(4, 5))
