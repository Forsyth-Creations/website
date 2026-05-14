import { getAllSlugs, getPostBySlug } from "@/lib/blog";
import WithNav from "@/comps/PageWrappers/WithNav.jsx";
import BlogContent from "@/comps/Blog/BlogContent";
import {
  Box,
  Typography,
  Chip,
  Stack,
  Divider,
  Button,
} from "@mui/material";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  try {
    const post = await getPostBySlug(slug);
    return {
      title: `${post.title} | Forsyth Creations`,
      description: post.description,
    };
  } catch {
    return { title: "Post Not Found | Forsyth Creations" };
  }
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  let post;
  try {
    post = await getPostBySlug(slug);
  } catch {
    notFound();
  }

  return (
    <WithNav>
      <Box sx={{ maxWidth: 800, mx: "auto", px: 3, py: 10 }}>
        <Link href="/blog" style={{ textDecoration: "none" }}>
          <Button startIcon={<ArrowBackIcon />} sx={{ mb: 3 }} color="inherit">
            All Posts
          </Button>
        </Link>

        {post.date && (
          <Typography variant="overline" color="text.secondary" display="block">
            {post.date}
          </Typography>
        )}

        <Typography variant="h3" fontWeight={700} gutterBottom>
          {post.title}
        </Typography>

        {post.description && (
          <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2 }}>
            {post.description}
          </Typography>
        )}

        {post.tags.length > 0 && (
          <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 3 }}>
            {post.tags.map((tag) => (
              <Chip key={tag} label={tag} size="small" />
            ))}
          </Stack>
        )}

        <Divider sx={{ mb: 4 }} />

        <BlogContent html={post.contentHtml} />
      </Box>
    </WithNav>
  );
}
