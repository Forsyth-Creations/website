"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import WithNav from "@/comps/PageWrappers/WithNav.jsx";
import BlogContent from "@/comps/Blog/BlogContent";
import {
  Box,
  Typography,
  Chip,
  Stack,
  Divider,
  Button,
  CircularProgress,
} from "@mui/material";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { getPostBySlug } from "@/lib/blog-api";

function BlogPost() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");
  const [post, setPost] = useState(null);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    if (!slug) {
      setMissing(true);
      return;
    }
    getPostBySlug(slug)
      .then(setPost)
      .catch(() => setMissing(true));
  }, [slug]);

  if (missing) {
    return (
      <Box sx={{ maxWidth: 800, mx: "auto", px: 3, py: 10 }}>
        <Typography variant="h4">Post not found.</Typography>
        <Button component={Link} href="/blog" startIcon={<ArrowBackIcon />} sx={{ mt: 2 }} color="inherit">
          All Posts
        </Button>
      </Box>
    );
  }

  if (!post) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", px: 3, py: 10 }}>
      <Button
        component={Link}
        href="/blog"
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 3 }}
        color="inherit"
      >
        All Posts
      </Button>

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
  );
}

export default function BlogPostPage() {
  return (
    <WithNav>
      <Suspense fallback={
        <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
          <CircularProgress />
        </Box>
      }>
        <BlogPost />
      </Suspense>
    </WithNav>
  );
}
