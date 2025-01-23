import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Box, useMediaQuery, Stack } from "@mui/material";
import ProjectStack from "@/comps/Toolbox/PaperStack";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import WholeScreen from "@/comps/Frames/WholeScreen";

const Projects = () => {
  const [viewMode, setViewMode] = useState("stack");

  const papers = {
    Drones: (
      <ProjectContents
        title="Senior Capstone: Autonomous Drones"
        description="Partnering with Anduril, I lead a team of 5 to develop a drone that could autonomously navigate a room, ingest visual datawith YOLOv8, and output human-readible text (Llama LLM) to describe the room"
        imageSrc="/forsyth/Projects/Drones.png"
      />
    ),
    Garden: (
      <ProjectContents
        title="Custom Stairs for Home Garden"
        description="For this project, I sourced retaining wall block, and cut it with a diamond blade to create custom stairs for a home garden."
        imageSrc="/forsyth/Projects/Stairs.png"
      />
    ),
    Hermes: (
      <ProjectContents
        title="Project Hermes"
        description="Hermes is a custom made, 3D printed and metal cut, swerve drive robot. Operating with ROS2 (Humble), Hermes is capable of autonomously navigating. His simulation environment is Gazebo. See more about him at his Github page."
        imageSrc="/forsyth/Projects/Hermes.png"
        buttonLink="https://github.com/Forsyth-Creations/ros_rigor"
      />
    ),
    Design: (
      <ProjectContents
        title="Free Lance 3D printing"
        description="As apart of Forsyth Creations, I take commissioned 3D printing projects. I have made custom parts for drones, custom phone stands, custom parts for 3D printers, and this model of a home"
        imageSrc="/forsyth/Projects/Home.png"
      />
    ),
  };

  if (viewMode === "stack") {
    return (
      <WholeScreen>
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
          {" "}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundImage: `url(/blueBackground.png)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              zIndex: -1,
              filter: "blur(0px)",
              transition: "background-image 0.5s ease-in-out",
              opacity: 0.3,
            }}
          />
          <Box sx={{ width: "100%", width: "100%" }}>
            <Button sx={{ ml: 3 }} onClick={() => setViewMode("list")}>
              View as List
            </Button>
            <ProjectStack papers={papers} />
          </Box>
        </Box>
      </WholeScreen>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 1,
      }}
    >
      <Button onClick={() => setViewMode("stack")}>View as Stack</Button>
      {Object.values(papers).map((paper, index) => (
        <Paper variant="outlined" key={index} sx={{ width: "100%", m: 1 }}>
          {paper}
        </Paper>
      ))}
    </Box>
  );
};

const ProjectContents = ({ title, description, imageSrc, buttonLink }) => {
  const isSmall = useMediaQuery("(max-width: 600px)");

  return (
    <Stack direction={isSmall ? "column" : "row"} spacing={2} sx={{ p: 2 }}>
      {imageSrc && (
        <Box
          component="img"
          src={imageSrc}
          alt={title}
          sx={{
            width: isSmall ? "70%" : "30%",
            height: "auto",
            borderRadius: 2,
            objectFit: "cover",
          }}
        />
      )}
      <Box sx={{ flex: 1 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body1" component="p">
          {description}
        </Typography>
        {buttonLink && (
          <Button
            href={buttonLink}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ mt: 1 }}
            variant="contained"
          >
            See More
          </Button>
        )}
      </Box>
    </Stack>
  );
};

export default Projects;
