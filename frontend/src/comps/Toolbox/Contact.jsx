import React from "react";
import { Email, LinkedIn, GitHub } from "@mui/icons-material";
import {
  Box,
  Typography,
  Link,
  Avatar,
  Stack,
  useMediaQuery,
} from "@mui/material";

const Contact = () => {
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));

  let photoSize = isSmallScreen ? 200 : 200;

  return (
    <Box className="contact-Box">
      <Stack
        spacing={3}
        direction={isSmallScreen ? "column" : "row"}
        alignItems="center"
      >
        <Avatar
          alt="Your Name"
          src="/forsyth/Henry1.jpg"
          className="contact-photo"
          sx={{ width: photoSize, height: photoSize }}
        />
        <Stack spacing={2}>
          <Typography variant="h4">R. Henry Forsyth Jr</Typography>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Email fontSize="large" />
            <Link
              href="mailto:robert.h.forsyth@gmail.com"
              underline="none"
              color="inherit"
              fontSize="large"
            >
              robert.h.forsyth@gmail.com
            </Link>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1}>
            <LinkedIn fontSize="large" />
            <Link
              href="https://www.linkedin.com/in/henry-forsyth-jr/"
              target="_blank"
              rel="noopener noreferrer"
              underline="none"
              color="inherit"
              fontSize="large"
            >
              LinkedIn
            </Link>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1}>
            <GitHub fontSize="large" />
            <Link
              href="https://github.com/Forsyth-Creations"
              target="_blank"
              rel="noopener noreferrer"
              underline="none"
              color="inherit"
              fontSize="large"
            >
              GitHub
            </Link>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Contact;
