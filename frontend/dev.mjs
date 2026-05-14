import { spawn } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const dir = path.dirname(fileURLToPath(import.meta.url));
const blogPostsDir = path.resolve(dir, "../blog_posts");
const blogLib = path.resolve(dir, "src/lib/blog.js");

// Run preload before starting dev server
await import("./preload.js");

const dev = spawn(
  path.resolve(dir, "node_modules/.bin/next"),
  ["dev", "--turbopack"],
  { stdio: "inherit" }
);

// Touch blog.js when any markdown file changes to trigger Turbopack HMR
fs.watch(blogPostsDir, (event, filename) => {
  if (!filename?.endsWith(".md")) return;
  const now = new Date();
  fs.utimesSync(blogLib, now, now);
  console.log(`[blog-watcher] ${filename} changed → refreshing`);
});

dev.on("close", (code) => process.exit(code ?? 0));

for (const sig of ["SIGINT", "SIGTERM"]) {
  process.on(sig, () => {
    dev.kill(sig);
    process.exit();
  });
}
