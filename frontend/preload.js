// copy-examples.js
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

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

// Generate static JSON for each blog post
const blogSrc = path.join(process.cwd(), "../blog_posts");
const blogDest = path.join(process.cwd(), "public/blog-data");

fs.rmSync(blogDest, { recursive: true, force: true });
fs.mkdirSync(blogDest, { recursive: true });

for (const fileName of fs.readdirSync(blogSrc).filter((f) => f.endsWith(".md"))) {
    const slug = fileName.replace(/\.md$/, "");
    const fileContents = fs.readFileSync(path.join(blogSrc, fileName), "utf8");
    const { data, content } = matter(fileContents);

    const processedContent = await remark().use(html, { sanitize: false }).process(content);
    const contentHtml = processedContent.toString();

    const post = {
        slug,
        title: data.title || slug,
        date: data.date || "",
        description: data.description || "",
        tags: data.tags || [],
        contentHtml,
    };

    fs.writeFileSync(path.join(blogDest, `${slug}.json`), JSON.stringify(post));
}
console.log("✓ Generated blog JSON → /frontend/public/blog-data");
