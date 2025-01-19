import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import PaperStack from "@/comps/Toolbox/PaperStack";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import WholeScreen, { useAdjustScroll } from "@/comps/Frames/WholeScreen";

const Projects = () => {
  const [viewMode, setViewMode] = useState("stack");

  const papers = {
    "Project 1": (
      <Project title="Project 1" description="This is the first project." />
    ),
    "Project 2": (
      <Project title="Project 2" description="This is the second project." />
    ),
    "Project 3": (
      <Project title="Project 3" description="This is the third project." />
    ),
  };

  if (viewMode === "stack") {
    return (
      <WholeScreen>
        <Box sx={{ width: "100%", width: "100%" }}>
          <Button sx={{ ml: 3 }} onClick={() => setViewMode("list")}>
            View as List
          </Button>
          <PaperStack papers={papers} />
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
        <Box key={index} sx={{ width: "100%", p: 1 }}>
          {paper}
        </Box>
      ))}
    </Box>
  );
};

const Project = ({ title, description }) => {
  return (
    <Paper
      variant="outlined"
      sx={{ height: "70vh", width: "100%", p: 2, borderRadius: 2 }}
    >
      <Typography variant="h5" component="h2">
        {title}
      </Typography>
      <Typography variant="body1" component="p">
        {description}
      </Typography>
    </Paper>
  );
};

export default Projects;
