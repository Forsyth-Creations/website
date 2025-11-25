// Function wrappers in Rust

// Basic function
fn add(a: i32, b: i32) -> i32 {
    a + b
}

// Function with default-like behavior using Option
fn greet(name: &str, greeting: Option<&str>) -> String {
    let g = greeting.unwrap_or("Hello");
    format!("{}, {}!", g, name)
}

// Higher-order function (function wrapper)
fn with_logging<F, T>(name: &str, f: F) -> T
where
    F: FnOnce() -> T,
{
    println!("Calling {}", name);
    let result = f();
    println!("Finished {}", name);
    result
}

fn main() {
    println!("{}", add(2, 3));
    println!("{}", greet("Alice", None));
    println!("{}", greet("Bob", Some("Hi")));

    let result = with_logging("multiply", || 4 * 5);
    println!("Result: {}", result);
}
