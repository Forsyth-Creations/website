// Control flow in Rust

fn main() {
    // If statement
    let value = 10;
    if value > 0 {
        println!("Positive");
    } else if value < 0 {
        println!("Negative");
    } else {
        println!("Zero");
    }

    // Match statement (similar to switch)
    let status = "success";
    match status {
        "success" => println!("Operation succeeded"),
        "error" => println!("Operation failed"),
        _ => println!("Unknown status"),
    }

    // For loop
    for i in 0..5 {
        println!("Iteration {}", i);
    }

    // While loop
    let mut count = 0;
    while count < 3 {
        println!("Count: {}", count);
        count += 1;
    }
}
