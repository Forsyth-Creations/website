This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Writing a Blog Post

Blog posts are plain Markdown files stored in `src/content/blog/`. Each file becomes a post at `/blog/<filename-without-extension>`.

**1. Create a new file:**

```
src/content/blog/your-post-slug.md
```

The filename becomes the URL slug (e.g. `my-post.md` → `/blog/my-post`).

**2. Add frontmatter at the top of the file:**

```markdown
---
title: "Your Post Title"
date: "YYYY-MM-DD"
description: "A short summary shown on the blog index."
tags: ["tag1", "tag2"]
---

Your content here...
```

| Field | Required | Description |
|---|---|---|
| `title` | Yes | Display title of the post |
| `date` | Yes | Publication date (`YYYY-MM-DD`); used for sorting |
| `description` | No | Short summary shown on the blog index |
| `tags` | No | Array of topic tags |

**3. Write your content** using standard Markdown below the frontmatter.

The post will automatically appear in the blog index sorted by date (newest first). No code changes required.
