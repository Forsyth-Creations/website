import React, { useState, useEffect } from "react";
import {
  Box,
  IconButton,
  Container,
  Typography,
  Paper,
  Stack,
  Modal,
  Divider,
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
  { label: "C, C++" },
  { label: "AWS" },
];

const CustomCarousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length); // Loop through items
    }, 3000); // Change every 3 seconds
    return () => clearInterval(interval);
  }, [items.length]);

  return (
    <Box
      sx={{ overflow: "hidden", whiteSpace: "nowrap", my: 2, maxWidth: "90vw" }}
    >
      <Box
        sx={{
          display: "inline-flex",
          animation: "scroll 40s linear infinite", // Slower animation for a smoother transition
          "@keyframes scroll": {
            "0%": { transform: "translateX(0)" },
            "100%": { transform: `translateX(-50%)` }, // Scroll halfway for wrap effect
          },
        }}
      >
        {[...Array(2)].map((_, i) => (
          <React.Fragment key={i}>
            {items.map((item, index) => (
              <Box
                key={index}
                display="inline-block"
                component={Paper}
                variant="outlined"
                sx={{ p: 2, mx: 1 }}
              >
                <Stack direction="row" spacing={1} alignItems="center">
                  {item.icon}
                  <Typography variant="caption" align="center">
                    {item.label}
                  </Typography>
                </Stack>
              </Box>
            ))}
          </React.Fragment>
        ))}
      </Box>
    </Box>
  );
};

const PaperHover = ({ children, onClick = () => {} }) => {
  const [hoverOn, setHoverOn] = useState(false);

  return (
    <Paper
      onMouseEnter={() => setHoverOn(true)}
      onMouseLeave={() => setHoverOn(false)}
      sx={{
        position: "relative",
        overflow: "hidden", // Ensures the hover effect stays within bounds
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          backgroundColor: hoverOn ? "#cccccc55" : "transparent",
          opacity: 0, // Default hidden
          transition: "opacity 0.2s ease-in-out",
          pointerEvents: "none", // Prevents interference with children
        },
        "&:hover::before": {
          opacity: 1, // Show hover effect
        },
        pointerEvents: "auto", // Allows hover effect to trigger
      }}
      onClick={onClick}
    >
      {children}
    </Paper>
  );
};

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80vw",
  maxWidth: "400px",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const WhoAmI = () => {
  const [modalOpen, setModalOpen] = useState(false);

  // Helper to chunk icons
  const chunkIcons = (icons, size) => {
    const result = [];
    for (let i = 0; i < icons.length; i += size) {
      result.push(icons.slice(i, i + size));
    }
    return result;
  };

  const [page, setPage] = useState(0);
  const chunkedIcons = chunkIcons(myIcons, 5);

  return (
    <Container>
      <Typography variant="h1" component="h1" gutterBottom>
        Who Am I?
      </Typography>
      <Typography variant="body1" sx={{ maxWidth: "600px" }}>
        Hello, my name is Henry Forsyth. I develop software and hardware
        solutions for the next generation of technology. I run Forsyth
        Creations, a consulting firm that specializes in software development,
        hardware design, and technology integration. My background includes the
        following:
      </Typography>
      <PaperHover
        onClick={() => setModalOpen(true)}
        sx={{ my: 2, p: 2, cursor: "pointer" }}
      >
        <CustomCarousel items={[...myIcons, ...myIcons]} />
      </PaperHover>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-title" gutterBottom>
            Yeah, I wouldn't want to wait for those to scroll either:
          </Typography>
          <Divider sx={{ m: "5px" }} />
          <Stack spacing={1}>
            {chunkedIcons[page].map((item, index) => (
              <Stack
                key={index}
                direction="row"
                spacing={1}
                alignItems="center"
              >
                {item.icon}
                <Typography variant="caption" align="center">
                  {item.label}
                </Typography>
              </Stack>
            ))}
          </Stack>
          <Stack direction="row" justifyContent="space-between" sx={{ mt: 2 }}>
            <IconButton
              onClick={() =>
                setPage((page - 1 + chunkedIcons.length) % chunkedIcons.length)
              }
            >
              Prev
            </IconButton>
            <IconButton
              onClick={() => setPage((page + 1) % chunkedIcons.length)}
            >
              Next
            </IconButton>
          </Stack>
        </Box>
      </Modal>
    </Container>
  );
};

export default WhoAmI;
