"use client";

import CodeBlock from "@/comps/Code/CodeBlock";
import {Box, Drawer, Typography} from "@mui/material";

export default function CodePage() {

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Code Example</h1>
      <CodeBlock.MultiExample examples={[
        { label: "Rust Example", filePath: "/examples/rust/hello_world.rs", language: "rust" }, 
        { label: "Python Example", filePath: "/examples/python/hello_world.py", language: "python" }
      ]} />
    </div>
  );
}