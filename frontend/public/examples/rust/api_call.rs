// Calling a remote API in Rust
// Note: Requires reqwest and tokio crates

use std::collections::HashMap;

// Using blocking reqwest for simplicity
fn fetch_data(url: &str) -> Result<HashMap<String, serde_json::Value>, Box<dyn std::error::Error>> {
    let response = reqwest::blocking::get(url)?;
    let data: HashMap<String, serde_json::Value> = response.json()?;
    Ok(data)
}

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let url = "https://jsonplaceholder.typicode.com/users/1";
    let user = fetch_data(url)?;

    if let Some(name) = user.get("name") {
        println!("Name: {}", name);
    }
    if let Some(email) = user.get("email") {
        println!("Email: {}", email);
    }

    Ok(())
}
