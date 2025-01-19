"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  ToggleButton,
  Stack,
  useMediaQuery,
} from "@mui/material";

export default function WorkExperience() {
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const experiences = [
    {
      name: "Torc Robotics",
      image: "/forsyth/Achieve/Torc.png",
      description:
        "Torc is an autonomous truck company devoted to making the highways safer through robotic assistance. They specialize in 18 wheelers, implementing LIDAR and cameras for better control. For the entire 2022 school year, I have had the pleasure of learning from their engineers, take on new tasks as well as work on full-stack web development. This is something that was foreign to me, but Torc gave me the flexibility to learn in every aspect where I was lacking knowledge. Pushing the limits of my knowledge is something I find wonderfully exhausting. It takes focus and dedication, all of which have been instilled within me at Torc.",
    },
    {
      name: "University of Virginia",
      image: "/forsyth/Achieve/uva.jpg",
      description:
        "This was one of the greatest experiences of my early career. After being a part of an engineering pilot program in 8th grade, I had the pleasure of meeting Dr. Bull at UVA. Like any professor, I could tell he was driven to succeed in his research. Not only that, he cared for the success of his students. That mix makes him an incredible force for good. Under him, I was encouraged to learn CAD, code, and a myriad of other skills. He connected me with his colleagues, such as Dr. Littman of Princeton, as well as employees James Rutter and Jo Watt, to develop engineering teaching aids based on 19th-century technology (telegraph, linear motor, speaker, etc). I worked under them for about 6 years, and don’t regret a single moment.",
    },
    {
      name: "Batlab at Virginia Tech",
      image: "/forsyth/Achieve/vt.jpg",
      description:
        "In this position, I worked with the BatLab to research devices that would mimic the horseshoe bat. With their impressive echolocation abilities, my team was interested in reproducing a facsimile for advanced sound-based 3D imaging and perception. This led the team in many directions. My job was mainly in system integration, where I linked the physical hardware and PCBs to the Python and MatLab-generated deep-learning model.",
    },
    {
      name: "GTA at Virginia Tech",
      image: "/forsyth/Achieve/Whittemore.png",
      description:
        "In this position, I helped students and professors manage the Senior Capstone projects, providing guidance and support throughout the process. I also assisted in grading and provided feedback on project deliverables.",
    },
    {
      name: "Amp Lab at Virginia Tech",
      image: "/forsyth/Achieve/Whittemore.png",
      description:
        "The Amp Lab at Virginia Tech is a student led, faculty mentored research group that focuses on the development of personal projects, and mentoring others. I lead this group, and we have worked on projects ranging from a 3D printed multi-agent robotic systems to a PCB design. I have also worked with the group to develop a curriculum for teaching basic electronics and programming to new members.",
    },
    {
      name: "Forsyth Creations",
      image: "/forsyth/Achieve/Forsyth.png",
      description:
        "Freelance web development and design. I've worked with clients on projects ranging from small business websites to full-stack applications. My work involves front-end and back-end development, ensuring that the websites are both visually appealing and functional.",
    },
  ];

  const [selected, setSelected] = useState(experiences[0]);

  const handleChange = (event, newValue) => {
    if (newValue !== null) {
      setSelected(newValue);
      setBackgroundImageUrl(newValue.image);
    }
  };

  const [backgroundImageUrl, setBackgroundImageUrl] = useState(selected.image);

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Background Image */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: `url(${backgroundImageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: -1,
          filter: "blur(0px)",
          transition: "background-image 0.5s ease-in-out",
          opacity: 0.3,
        }}
      />

      {/* Content */}
      <Box sx={{ p: 3, position: "relative", zIndex: 1, height: "80vh" }}>
        <Typography variant="h4" align="center" sx={{ mb: 3 }}>
          Experience
        </Typography>

        {/* Toggle Buttons */}
        <Stack direction="row" justifyContent="center" flexWrap={"wrap"}>
          {experiences.map((exp) => (
            <ToggleButton
              key={exp.name}
              value={exp}
              selected={selected.name === exp.name}
              onChange={handleChange}
              sx={{
                p: 1,
                fontSize: ".7rem",
                backgroundColor:
                  selected.name === exp.name
                    ? "#1565c0"
                    : "rgba(255, 255, 255, 0.8)",
                color: selected.name === exp.name ? "white" : "black",
                "&:hover": {
                  backgroundColor: "#1e88e5",
                  color: "white",
                },
                width: "15vw",
                minWidth: "100px",
                m: 1,
              }}
            >
              {exp.name}
            </ToggleButton>
          ))}
        </Stack>

        {/* Description Section */}
        <Stack
          direction={isSmall ? "column" : "row"}
          spacing={2}
          sx={{
            mt: 4,
            p: 2,
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            borderRadius: 2,
            maxHeight: "40vh",
            overflowY: "auto",
          }}
        >
          <Stack>
            <Typography variant="h3" sx={{ color: "white" }}>
              {selected.name}
            </Typography>
            <Typography mt={1} sx={{ color: "white", fontSize: "1.2rem" }}>
              {selected.description}
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}
