# Writing to a file in Python

# Write to a file
with open("output.txt", "w") as file:
    file.write("Hello, World!\n")
    file.write("This is a test file.\n")

# Append to a file
with open("output.txt", "a") as file:
    file.write("Appended line.\n")

# Read from a file
with open("output.txt", "r") as file:
    content = file.read()
    print(content)
