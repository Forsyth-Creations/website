// Defining primitives in Rust

fn main() {
    // Integer types
    let age: i32 = 25;
    let count: u64 = 100;

    // Float types
    let temperature: f64 = 98.6;

    // String types
    let name: &str = "Alice";
    let owned_name: String = String::from("Bob");

    // Boolean
    let is_active: bool = true;

    // Character
    let letter: char = 'A';

    // Tuple
    let coordinates: (f64, f64) = (10.0, 20.0);

    // Array
    let numbers: [i32; 5] = [1, 2, 3, 4, 5];

    // Vector
    let mut items: Vec<i32> = vec![1, 2, 3];
    items.push(4);

    println!("Name: {}, Age: {}, Active: {}", name, age, is_active);
}
