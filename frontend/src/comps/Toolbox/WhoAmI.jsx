import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Stack,
  Modal,
  Divider,
  IconButton,
} from "@mui/material";
import {
  FaHtml5,
  FaJs,
  FaReact,
  FaNodeJs,
  FaJava,
  FaPython,
  FaDocker,
} from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRaspberryPi,
  faUbuntu,
  faRedhat,
} from "@fortawesome/free-brands-svg-icons";

const myIcons = [
  { icon: <FaHtml5 />, label: "HTML5" },
  { icon: <FaJs />, label: "JavaScript" },
  { icon: <FaReact />, label: "React" },
  { icon: <FaNodeJs />, label: "Node.js" },
  { icon: <FaJava />, label: "Java" },
  { icon: <FaPython />, label: "Python" },
  { icon: <FaDocker />, label: "Docker" },
  { icon: <FontAwesomeIcon icon={faRaspberryPi} />, label: "Raspberry Pi" },
  { icon: <FontAwesomeIcon icon={faUbuntu} />, label: "Ubuntu" },
  { icon: <FontAwesomeIcon icon={faRedhat} />, label: "Red Hat" },
  { label: "Solidworks" },
  { label: "Fusion360" },
  { label: "KiCad" },
  { label: "Arduino" },
  { label: "Inkscape" },
  { label: "ROS2" },
  { label: "C / C++" },
  { label: "AWS" },
];

const SkillTicker = ({ onClick }) => (
  <Box
    onClick={onClick}
    sx={{
      overflow: "hidden",
      whiteSpace: "nowrap",
      my: 3,
      maxWidth: "100%",
      cursor: "pointer",
      "&:hover .ticker-inner": { animationPlayState: "paused" },
    }}
  >
    <Box
      className="ticker-inner"
      sx={{
        display: "inline-flex",
        animation: "ticker 35s linear infinite",
        "@keyframes ticker": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      }}
    >
      {[0, 1].map((copy) => (
        <React.Fragment key={copy}>
          {myIcons.map((item, i) => (
            <Box
              key={i}
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                mx: 1,
                px: 1.5,
                py: 0.75,
                border: "1px solid",
                borderColor: "divider",
                borderRadius: "4px",
                fontSize: "0.78rem",
                fontFamily: "Barlow, sans-serif",
                letterSpacing: "0.04em",
                color: "text.secondary",
                transition: "color 0.2s, borderColor 0.2s",
              }}
            >
              {item.icon && (
                <Box sx={{ fontSize: "1rem", display: "flex" }}>{item.icon}</Box>
              )}
              {item.label}
            </Box>
          ))}
        </React.Fragment>
      ))}
    </Box>
  </Box>
);

const chunkArray = (arr, size) => {
  const result = [];
  for (let i = 0; i < arr.length; i += size) result.push(arr.slice(i, i + size));
  return result;
};

const WhoAmI = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [page, setPage] = useState(0);
  const chunkedIcons = chunkArray(myIcons, 6);

  return (
    <Container maxWidth="md">
      <Stack spacing={3}>
        <Box>
          <Typography
            variant="h1"
            sx={{
              color: "primary.main",
              mb: 0,
              lineHeight: 0.95,
            }}
          >
            Who
          </Typography>
          <Typography
            variant="h1"
            sx={{
              color: "text.primary",
              lineHeight: 0.95,
            }}
          >
            Am I?
          </Typography>
        </Box>

        <Divider sx={{ borderColor: "primary.main", borderWidth: 2, width: 60 }} />

        <Typography
          variant="body1"
          sx={{ maxWidth: "600px", color: "text.secondary", fontSize: "1.05rem" }}
        >
          Hello, my name is{" "}
          <Box component="span" sx={{ color: "text.primary", fontWeight: 600 }}>
            Henry Forsyth
          </Box>
          . I develop software and hardware solutions for the next generation of
          technology. I run{" "}
          <Box component="span" sx={{ color: "primary.main", fontWeight: 600 }}>
            Forsyth Creations
          </Box>
          , a consulting firm specializing in software development, hardware
          design, and technology integration.
        </Typography>

        <Box>
          <Typography
            variant="body2"
            sx={{ mb: 1, color: "text.secondary", letterSpacing: "0.08em", textTransform: "uppercase", fontSize: "0.7rem" }}
          >
            Skills & Tools — click to expand
          </Typography>
          <SkillTicker onClick={() => setModalOpen(true)} />
        </Box>
      </Stack>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "min(420px, 90vw)",
            bgcolor: "background.paper",
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 1,
            p: 4,
          }}
        >
          <Typography
            variant="h4"
            sx={{ mb: 2, fontFamily: "Barlow Condensed, sans-serif", fontWeight: 700, textTransform: "uppercase" }}
          >
            Skills & Tools
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Stack spacing={1.5}>
            {chunkedIcons[page].map((item, index) => (
              <Stack key={index} direction="row" spacing={1.5} alignItems="center">
                {item.icon && (
                  <Box sx={{ fontSize: "1.2rem", color: "primary.main", display: "flex" }}>
                    {item.icon}
                  </Box>
                )}
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {item.label}
                </Typography>
              </Stack>
            ))}
          </Stack>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 3 }}>
            <IconButton
              size="small"
              onClick={() => setPage((page - 1 + chunkedIcons.length) % chunkedIcons.length)}
              sx={{ border: "1px solid", borderColor: "divider", borderRadius: 1, px: 1.5 }}
            >
              <Typography variant="body2">← Prev</Typography>
            </IconButton>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {page + 1} / {chunkedIcons.length}
            </Typography>
            <IconButton
              size="small"
              onClick={() => setPage((page + 1) % chunkedIcons.length)}
              sx={{ border: "1px solid", borderColor: "divider", borderRadius: 1, px: 1.5 }}
            >
              <Typography variant="body2">Next →</Typography>
            </IconButton>
          </Stack>
        </Box>
      </Modal>
    </Container>
  );
};

export default WhoAmI;
