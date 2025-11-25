// copy-examples.js
import fs from "fs";
import path from "path";

const src = path.join(process.cwd(), "../examples");
const dest = path.join(process.cwd(), "public/examples");

fs.rmSync(dest, { recursive: true, force: true });
fs.mkdirSync(dest, { recursive: true });

function copyDir(src, dest) {
    for (const item of fs.readdirSync(src)) {
        const srcPath = path.join(src, item);
        const destPath = path.join(dest, item);

        const stat = fs.statSync(srcPath);
        if (stat.isDirectory()) {
            fs.mkdirSync(destPath, { recursive: true });
            copyDir(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

copyDir(src, dest);
console.log("✓ Copied /examples → /frontend/public/examples");
