export async function getPostBySlug(slug) {
  const res = await fetch(`/blog-data/${slug}.json`);
  if (!res.ok) throw new Error(`Post not found: ${slug}`);
  return res.json();
}
