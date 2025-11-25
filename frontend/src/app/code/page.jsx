"use client";

import WithNav from "@/comps/PageWrappers/WithNav.jsx";
import CodeBlock from "@/comps/Code/CodeBlock";
import { Box, Typography } from "@mui/material";

export default function CodePage() {

  return (
    <WithNav>
      <Box sx={{ padding: "2rem", mt : 5 }}>
        <Typography variant="h4" gutterBottom>Code Examples</Typography>

        <CodeBlock.MultiExample name="Hello World" examples={[
          { label: "Python", filePath: "/examples/python/hello_world.py", language: "python" },
          { label: "Rust", filePath: "/examples/rust/hello_world.rs", language: "rust" },
          { label: "JavaScript", filePath: "/examples/javascript/hello_world.js", language: "javascript" },
          { label: "C++", filePath: "/examples/cpp/hello_world.cpp", language: "cpp" }
        ]} />

        <CodeBlock.MultiExample name="Making Objects" examples={[
          { label: "Python", filePath: "/examples/python/objects.py", language: "python" },
          { label: "Rust", filePath: "/examples/rust/objects.rs", language: "rust" },
          { label: "JavaScript", filePath: "/examples/javascript/objects.js", language: "javascript" },
          { label: "C++", filePath: "/examples/cpp/objects.cpp", language: "cpp" }
        ]} />

        <CodeBlock.MultiExample name="Defining Primitives" examples={[
          { label: "Python", filePath: "/examples/python/primitives.py", language: "python" },
          { label: "Rust", filePath: "/examples/rust/primitives.rs", language: "rust" },
          { label: "JavaScript", filePath: "/examples/javascript/primitives.js", language: "javascript" },
          { label: "C++", filePath: "/examples/cpp/primitives.cpp", language: "cpp" }
        ]} />

        <CodeBlock.MultiExample name="Control Flow (if, switch, for, while)" examples={[
          { label: "Python", filePath: "/examples/python/control_flow.py", language: "python" },
          { label: "Rust", filePath: "/examples/rust/control_flow.rs", language: "rust" },
          { label: "JavaScript", filePath: "/examples/javascript/control_flow.js", language: "javascript" },
          { label: "C++", filePath: "/examples/cpp/control_flow.cpp", language: "cpp" }
        ]} />

        <CodeBlock.MultiExample name="Function Wrappers" examples={[
          { label: "Python", filePath: "/examples/python/functions.py", language: "python" },
          { label: "Rust", filePath: "/examples/rust/functions.rs", language: "rust" },
          { label: "JavaScript", filePath: "/examples/javascript/functions.js", language: "javascript" },
          { label: "C++", filePath: "/examples/cpp/functions.cpp", language: "cpp" }
        ]} />

        <CodeBlock.MultiExample name="Calling Remote API" examples={[
          { label: "Python", filePath: "/examples/python/api_call.py", language: "python" },
          { label: "Rust", filePath: "/examples/rust/api_call.rs", language: "rust" },
          { label: "JavaScript", filePath: "/examples/javascript/api_call.js", language: "javascript" },
          { label: "C++", filePath: "/examples/cpp/api_call.cpp", language: "cpp" }
        ]} />

        <CodeBlock.MultiExample name="Writing to a File" examples={[
          { label: "Python", filePath: "/examples/python/file_io.py", language: "python" },
          { label: "Rust", filePath: "/examples/rust/file_io.rs", language: "rust" },
          { label: "JavaScript", filePath: "/examples/javascript/file_io.js", language: "javascript" },
          { label: "C++", filePath: "/examples/cpp/file_io.cpp", language: "cpp" }
        ]} />
      </Box>
    </WithNav>
  );
}