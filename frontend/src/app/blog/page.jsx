import WithNav from "@/comps/PageWrappers/WithNav.jsx";
import { getAllPosts } from "@/lib/blog";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Stack,
} from "@mui/material";
import Link from "next/link";

export const metadata = {
  title: "Blog | Forsyth Creations",
  description: "Technical write-ups, project updates, and more.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <WithNav>
      <Box sx={{ maxWidth: 800, mx: "auto", px: 3, py: 10 }}>
        <Typography variant="h3" fontWeight={700} gutterBottom>
          Blog
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Technical write-ups, project updates, and general thoughts.
        </Typography>

        <Stack spacing={3}>
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Card
                variant="outlined"
                sx={{ "&:hover": { bgcolor: "action.hover", cursor: "pointer" } }}
              >
                <CardContent>
                  <Typography variant="overline" color="text.secondary">
                    {post.date}
                  </Typography>
                  <Typography variant="h5" fontWeight={600} gutterBottom>
                    {post.title}
                  </Typography>
                  {post.description && (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 1.5 }}
                    >
                      {post.description}
                    </Typography>
                  )}
                  {post.tags.length > 0 && (
                    <Stack direction="row" spacing={1} flexWrap="wrap">
                      {post.tags.map((tag) => (
                        <Chip key={tag} label={tag} size="small" />
                      ))}
                    </Stack>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}

          {posts.length === 0 && (
            <Typography color="text.secondary">
              No posts yet. Add a{" "}
              <code>.md</code> file to{" "}
              <code>src/content/blog/</code> to get started.
            </Typography>
          )}
        </Stack>
      </Box>
    </WithNav>
  );
}
