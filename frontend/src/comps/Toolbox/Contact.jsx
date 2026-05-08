import React from "react";
import { Email, LinkedIn, GitHub, ArrowOutward } from "@mui/icons-material";
import {
  Box,
  Typography,
  Avatar,
  Stack,
  useMediaQuery,
  Divider,
} from "@mui/material";

const ContactLink = ({ icon, href, label, sublabel }) => (
  <Box
    component="a"
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 2,
      py: 1.5,
      px: 2,
      border: "1px solid",
      borderColor: "divider",
      borderRadius: 0,
      textDecoration: "none",
      color: "text.primary",
      transition: "all 0.18s ease",
      "&:hover": {
        borderColor: "primary.main",
        color: "primary.main",
        bgcolor: "action.hover",
        "& .arrow": { transform: "translate(2px, -2px)" },
      },
    }}
  >
    <Stack direction="row" spacing={2} alignItems="center">
      <Box sx={{ color: "primary.main", display: "flex", fontSize: "1.2rem" }}>
        {icon}
      </Box>
      <Box>
        <Typography variant="body2" sx={{ fontWeight: 600, lineHeight: 1.2 }}>
          {label}
        </Typography>
        {sublabel && (
          <Typography variant="body2" sx={{ color: "text.secondary", fontSize: "0.8rem" }}>
            {sublabel}
          </Typography>
        )}
      </Box>
    </Stack>
    <ArrowOutward className="arrow" sx={{ fontSize: "1rem", opacity: 0.5, transition: "transform 0.18s ease" }} />
  </Box>
);

const Contact = () => {
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("md"));

  return (
    <Box sx={{ px: { xs: 3, md: 6 }, width: "100%", maxWidth: 900, mx: "auto" }}>
      <Stack spacing={4}>
        <Box>
          <Typography variant="h1" sx={{ color: "primary.main", lineHeight: 0.95, mb: 0 }}>
            Get In
          </Typography>
          <Typography variant="h1" sx={{ color: "text.primary", lineHeight: 0.95 }}>
            Touch
          </Typography>
          <Divider sx={{ mt: 2, borderColor: "primary.main", borderWidth: 2, width: 60 }} />
        </Box>

        <Stack
          direction={isSmall ? "column" : "row"}
          spacing={isSmall ? 3 : 6}
          alignItems={isSmall ? "center" : "flex-start"}
        >
          <Box sx={{ flexShrink: 0 }}>
            <Avatar
              alt="Henry Forsyth"
              src="/forsyth/Henry1.jpg"
              sx={{
                width: isSmall ? 140 : 180,
                height: isSmall ? 140 : 180,
                border: "3px solid",
                borderColor: "primary.main",
              }}
            />
          </Box>

          <Stack spacing={2} sx={{ width: "100%" }}>
            <Box>
              <Typography variant="h3" sx={{ fontWeight: 700, mb: 0.25 }}>
                R. Henry Forsyth Jr
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Software & Hardware Engineer · Forsyth Creations LLC
              </Typography>
            </Box>

            <Stack spacing={1.5}>
              <ContactLink
                icon={<Email />}
                href="mailto:robert.h.forsyth@gmail.com"
                label="robert.h.forsyth@gmail.com"
                sublabel="Email"
              />
              <ContactLink
                icon={<LinkedIn />}
                href="https://www.linkedin.com/in/henry-forsyth-jr/"
                label="henry-forsyth-jr"
                sublabel="LinkedIn"
              />
              <ContactLink
                icon={<GitHub />}
                href="https://github.com/Forsyth-Creations"
                label="Forsyth-Creations"
                sublabel="GitHub"
              />
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Contact;
