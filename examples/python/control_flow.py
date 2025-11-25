# Control flow in Python

# If statement
value = 10
if value > 0:
    print("Positive")
elif value < 0:
    print("Negative")
else:
    print("Zero")

# Match statement (Python 3.10+, similar to switch)
status = "success"
match status:
    case "success":
        print("Operation succeeded")
    case "error":
        print("Operation failed")
    case _:
        print("Unknown status")

# For loop
for i in range(5):
    print(f"Iteration {i}")

# While loop
count = 0
while count < 3:
    print(f"Count: {count}")
    count += 1
