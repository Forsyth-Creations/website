// Writing to a file in Rust

use std::fs::File;
use std::io::{Write, Read, BufWriter};

fn main() -> std::io::Result<()> {
    // Write to a file
    let file = File::create("output.txt")?;
    let mut writer = BufWriter::new(file);
    writeln!(writer, "Hello, World!")?;
    writeln!(writer, "This is a test file.")?;
    writer.flush()?;

    // Append to a file
    let mut file = File::options().append(true).open("output.txt")?;
    writeln!(file, "Appended line.")?;

    // Read from a file
    let mut file = File::open("output.txt")?;
    let mut content = String::new();
    file.read_to_string(&mut content)?;
    println!("{}", content);

    Ok(())
}
