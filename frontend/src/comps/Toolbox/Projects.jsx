"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  Stack,
  Button,
  IconButton,
  Chip,
} from "@mui/material";
import { ArrowBack, ArrowForward, OpenInNew } from "@mui/icons-material";

const projects = [
  {
    id: "padua",
    title: "Padua Software",
    description:
      "Lab inventory management that grew into a full project-tracking system. Written in Python and Next.js with a MongoDB backend.",
    image: "/forsyth/Projects/Padua.png",
    tags: ["Python", "Next.js", "MongoDB"],
  },
  {
    id: "drones",
    title: "Autonomous Drones",
    description:
      "Senior capstone with Anduril — led a team of 5 building a drone that navigates autonomously, ingests visual data with YOLOv8, and generates room descriptions via Llama LLM.",
    image: "/forsyth/Projects/Drones.png",
    tags: ["ROS2", "YOLOv8", "Python", "LLM"],
  },
  {
    id: "garden",
    title: "Custom Garden Stairs",
    description:
      "Sourced retaining wall block and cut it with a diamond blade to build custom stairs for a home garden — design, material selection, and construction from scratch.",
    image: "/forsyth/Projects/Stairs.png",
    tags: ["Masonry", "Design", "Construction"],
  },
  {
    id: "hermes",
    title: "Project Hermes",
    description:
      "Custom 3D-printed and metal-cut swerve drive robot running ROS2 Humble. Navigates autonomously with Gazebo simulation.",
    image: "/forsyth/Projects/Hermes.png",
    link: "https://github.com/Forsyth-Creations/ros_rigor",
    tags: ["ROS2", "Gazebo", "3D Printing", "C++"],
  },
  {
    id: "printing",
    title: "Freelance 3D Printing",
    description:
      "Commissioned work spanning drone components, custom phone stands, printer parts, and an architectural house model.",
    image: "/forsyth/Projects/Home.png",
    tags: ["Fusion360", "FDM", "CAD"],
  },
];

const Projects = () => {
  const [idx, setIdx] = useState(0);
  const [hovered, setHovered] = useState(false);
  const intervalRef = useRef(null);

  const navigate = useCallback(
    (newIdx) => setIdx((newIdx + projects.length) % projects.length),
    [],
  );

  const prev = () => navigate(idx - 1);
  const next = () => navigate(idx + 1);

  useEffect(() => {
    if (hovered) return;
    intervalRef.current = setInterval(() => {
      setIdx((i) => (i + 1) % projects.length);
    }, 4000);
    return () => clearInterval(intervalRef.current);
  }, [hovered]);

  const current = projects[idx];

  return (
    <Box
      className="adjustable-content"
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: { xs: 3, md: 8 },
      }}
    >
      <Box
        sx={{ width: "100%", maxWidth: 1100 }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Header row */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 3 }}
        >
          <Box>
            <Typography
              sx={{
                fontFamily: "Barlow Condensed, sans-serif",
                fontWeight: 700,
                fontSize: "0.72rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "text.secondary",
                mb: 0.5,
              }}
            >
              Selected Work
            </Typography>
            <Typography
              variant="h2"
              sx={{ lineHeight: 1 }}
            >
              {current.title}
            </Typography>
          </Box>

          {/* Counter + arrows */}
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Typography
              sx={{
                fontFamily: "Barlow Condensed, sans-serif",
                fontWeight: 700,
                fontSize: "0.9rem",
                letterSpacing: "0.1em",
                color: "text.secondary",
                minWidth: 48,
                textAlign: "right",
              }}
            >
              {String(idx + 1).padStart(2, "0")}/{String(projects.length).padStart(2, "0")}
            </Typography>
            <IconButton
              onClick={prev}
              size="small"
              sx={{
                width: 36,
                height: 36,
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 1,
                color: "text.primary",
                transition: "all 0.2s",
                "&:hover": { bgcolor: "primary.main", borderColor: "primary.main", color: "white" },
              }}
            >
              <ArrowBack fontSize="small" />
            </IconButton>
            <IconButton
              onClick={next}
              size="small"
              sx={{
                width: 36,
                height: 36,
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 1,
                color: "text.primary",
                transition: "all 0.2s",
                "&:hover": { bgcolor: "primary.main", borderColor: "primary.main", color: "white" },
              }}
            >
              <ArrowForward fontSize="small" />
            </IconButton>
          </Stack>
        </Stack>

        {/* Split card */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={0}
          sx={{
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 1.5,
            overflow: "hidden",
            height: { xs: "auto", md: "420px" },
          }}
        >
          {/* Image */}
          <Box
            sx={{
              flex: { xs: "none", md: "0 0 52%" },
              height: { xs: 220, md: "100%" },
              position: "relative",
              overflow: "hidden",
            }}
          >
            {projects.map((p, i) => (
              <Box
                key={p.id}
                component="img"
                src={p.image}
                alt={p.title}
                sx={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  opacity: i === idx ? 1 : 0,
                  transition: "opacity 0.5s ease",
                }}
              />
            ))}
          </Box>

          {/* Content */}
          <Box
            sx={{
              flex: 1,
              p: { xs: 3, md: 4 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              bgcolor: "background.paper",
            }}
          >
            <Box>
              <Typography
                variant="body1"
                sx={{ color: "text.secondary", lineHeight: 1.7, mb: 2.5 }}
              >
                {current.description}
              </Typography>

              <Stack direction="row" spacing={0.75} flexWrap="wrap" useFlexGap>
                {current.tags.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    size="small"
                    sx={{
                      fontFamily: "Barlow, sans-serif",
                      fontSize: "0.68rem",
                      letterSpacing: "0.04em",
                      height: 22,
                    }}
                  />
                ))}
              </Stack>
            </Box>

            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ mt: 3 }}
            >
              {current.link ? (
                <Button
                  href={current.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  endIcon={<OpenInNew sx={{ fontSize: "0.85rem !important" }} />}
                  variant="contained"
                  size="small"
                  sx={{
                    fontFamily: "Barlow Condensed, sans-serif",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    fontSize: "0.8rem",
                  }}
                >
                  View Project
                </Button>
              ) : (
                <Box />
              )}

              {/* Dot indicators */}
              <Stack direction="row" spacing={0.75}>
                {projects.map((_, i) => (
                  <Box
                    key={i}
                    onClick={() => setIdx(i)}
                    sx={{
                      width: i === idx ? 20 : 6,
                      height: 3,
                      borderRadius: 2,
                      bgcolor: i === idx ? "primary.main" : "divider",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                    }}
                  />
                ))}
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default Projects;
