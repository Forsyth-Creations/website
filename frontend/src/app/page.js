"use client";

import WithNav from "@/comps/PageWrappers/WithNav.jsx";
import Art from "@/comps/Art/StandardArt.jsx";
import WholeScreen from "@/comps/Frames/WholeScreen";
import Contact from "@/comps/Toolbox/Contact";
import WhoAmI from "@/comps/Toolbox/WhoAmI";
import WorkExperience from "@/comps/Toolbox/WorkExperience";
import MoreToSee from "@/comps/Toolbox/MoreToSee";
import Projects from "@/comps/Toolbox/Projects";
import React from "react";
import Carousel from "@/comps/Toolbox/Carousel";
import { FaDiscord } from "react-icons/fa";
import { Button, Stack, Typography, Box, Divider } from "@mui/material";
import { OpenInNew } from "@mui/icons-material";

const simulations = [
  {
    image: "/sims/follow.png",
    link: "/sim/follow",
    title: "Follow Simulation",
    description: "Multi-agent following behavior",
  },
  {
    image: "/sims/platoon.png",
    link: "/sim/platoon",
    title: "Platoon Simulation",
    description: "Coordinated convoy control",
  },
  {
    image: "/sims/swerve.png",
    link: "/swerve_drive",
    title: "Swerve Drive",
    description: "Holonomic robot control system",
  },
];

// Full-width 1px rule between sections
const SectionRule = () => (
  <Box sx={{ width: "100%", borderTop: "1px solid", borderColor: "divider" }} />
);

// Small section label pinned to the top-left inside a relative-positioned section
const SectionLabel = ({ number, label }) => (
  <Box
    sx={{
      position: "absolute",
      top: { xs: 68, md: 76 },
      left: { xs: 20, md: 40 },
      zIndex: 10,
      display: "flex",
      alignItems: "center",
      gap: 1.25,
    }}
  >
    <Typography
      sx={{
        fontFamily: "Barlow Condensed, sans-serif",
        fontWeight: 700,
        fontSize: "0.65rem",
        letterSpacing: "0.2em",
        color: "text.secondary",
        textTransform: "uppercase",
        lineHeight: 1,
      }}
    >
      {String(number).padStart(2, "0")}
    </Typography>
    <Box
      sx={{
        width: 24,
        height: 1,
        bgcolor: "divider",
      }}
    />
    <Typography
      sx={{
        fontFamily: "Barlow Condensed, sans-serif",
        fontWeight: 700,
        fontSize: "0.65rem",
        letterSpacing: "0.2em",
        color: "text.secondary",
        textTransform: "uppercase",
        lineHeight: 1,
      }}
    >
      {label}
    </Typography>
  </Box>
);

const SiteFooter = () => (
  <Box
    component="footer"
    sx={{
      py: 3,
      px: { xs: 3, md: 5 },
      borderTop: "1px solid",
      borderColor: "divider",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: 2,
    }}
  >
    <Typography
      variant="body2"
      sx={{ color: "text.secondary", fontSize: "0.72rem", letterSpacing: "0.04em" }}
    >
      © {new Date().getFullYear()} Forsyth Creations LLC
    </Typography>
    <Typography
      component="a"
      href="https://github.com/Forsyth-Creations/website/actions/workflows/deploy.yml"
      target="_blank"
      variant="body2"
      sx={{
        color: "text.secondary",
        fontSize: "0.72rem",
        textDecoration: "none",
        letterSpacing: "0.04em",
        "&:hover": { color: "text.primary" },
      }}
    >
      Build Status ↗
    </Typography>
  </Box>
);

export default function Home() {
  const [stillOnTop, setStillOnTop] = React.useState(false);
  const timeoutRef = React.useRef(null);

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setStillOnTop(false);
      clearTimeout(timeoutRef.current);
    } else {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setStillOnTop(true), 2000);
    }
  };

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    timeoutRef.current = setTimeout(() => setStillOnTop(true), 2000);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <WithNav>
      {/* 01 — Hero */}
      <Box className="adjustable-content" sx={{ position: "relative" }}>
        <SectionLabel number={1} label="Forsyth Creations" />
        <WholeScreen>
          <Stack alignItems="center" spacing={3}>
            <Art
              lightModeSVG="/forsyth/Branding/Logo_Black.svg"
              darkModeSVG="/forsyth/Branding/Logo_White.svg"
            />
            <Typography
              sx={{
                fontFamily: "Barlow Condensed, sans-serif",
                fontWeight: 600,
                fontSize: { xs: "0.75rem", md: "0.85rem" },
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "text.secondary",
              }}
            >
              Software · Hardware · Innovation
            </Typography>
          </Stack>
          <MoreToSee show={stillOnTop} />
        </WholeScreen>
      </Box>

      <SectionRule />

      {/* 02 — About */}
      <Box className="adjustable-content" sx={{ position: "relative" }}>
        <SectionLabel number={2} label="About" />
        <WholeScreen>
          <WhoAmI />
        </WholeScreen>
      </Box>

      <SectionRule />

      {/* 03 — Work */}
      <Box sx={{ position: "relative" }}>
        <SectionLabel number={3} label="Selected Work" />
        <Projects />
      </Box>

      <SectionRule />

      {/* 04 — Experience */}
      <Box className="adjustable-content" sx={{ position: "relative" }}>
        <SectionLabel number={4} label="Experience" />
        <WholeScreen>
          <WorkExperience />
        </WholeScreen>
      </Box>

      <SectionRule />

      {/* 05 — Simulations */}
      <Box className="adjustable-content" sx={{ position: "relative" }}>
        <SectionLabel number={5} label="Simulations" />
        <WholeScreen>
          <Stack spacing={4} alignItems="center" sx={{ width: "100%", px: 3 }}>
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h2">Online Simulations</Typography>
              <Box
                sx={{
                  mt: 1.5,
                  width: 40,
                  height: 2,
                  bgcolor: "primary.main",
                  mx: "auto",
                }}
              />
            </Box>
            <Carousel slides={simulations} />
          </Stack>
        </WholeScreen>
      </Box>

      <SectionRule />

      {/* 06 — Contact */}
      <Box className="adjustable-content" sx={{ position: "relative" }}>
        <SectionLabel number={6} label="Contact" />
        <WholeScreen>
          <Contact />
        </WholeScreen>
      </Box>

      <SectionRule />

      {/* 07 — Community */}
      <Box className="adjustable-content" sx={{ position: "relative" }}>
        <SectionLabel number={7} label="Community" />
        <WholeScreen>
          <Box sx={{ textAlign: "center", maxWidth: 480, mx: "auto", px: 4 }}>
            <FaDiscord size={40} color="#5865F2" style={{ marginBottom: 24 }} />
            <Typography variant="h2" sx={{ mb: 1.5 }}>
              Join the Community
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "text.secondary", mb: 4, lineHeight: 1.7 }}
            >
              Get updates, discuss projects, and connect directly. Open to
              everyone interested in robotics, software, and making things.
            </Typography>
            <Button
              variant="contained"
              size="large"
              href="https://discord.gg/bJc8gUBXDj"
              target="_blank"
              endIcon={<OpenInNew fontSize="small" />}
            >
              Join Discord
            </Button>
          </Box>
        </WholeScreen>
      </Box>

      <SiteFooter />
    </WithNav>
  );
}
