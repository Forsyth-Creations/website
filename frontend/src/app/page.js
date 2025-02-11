"use client";

import WithNav from "@/comps/PageWrappers/WithNav.jsx";
import Art from "@/comps/Art/StandardArt.jsx";
import WholeScreen from "@/comps/Frames/WholeScreen";
import Contact from "@/comps/Toolbox/Contact";
import WhoAmI from "@/comps/Toolbox/WhoAmI";
import WorkExperience from "@/comps/Toolbox/WorkExperience";
import MoreToSee from "@/comps/Toolbox/MoreToSee";
import Projects from "@/comps/Toolbox/Projects";
import axios from "axios";
import { FaDiscord } from "react-icons/fa";
import { Button, Stack, Typography, Box, Chip } from "@mui/material";
import React from "react";

const BuildStatus = () => {
  let href =
    "https://github.com/Forsyth-Creations/website/actions/workflows/deploy.yml/badge.svg";
  let link = "https://github.com/Forsyth-Creations/website";

  return (
    <Box sx={{ cursor: "pointer" }} onClick={() => window.open(link, "_blank")}>
      <img src={href} alt="Build Status" style={{ height: 20 }} />
    </Box>
  );
};

const PaduaStatus = ({ api_endpoint }) => {
  const [status, setStatus] = React.useState("loading");

  React.useEffect(() => {
    axios
      .get(api_endpoint)
      .then((response) => {
        setStatus(response.data.message);
      })
      .catch(() => {
        setStatus("error");
      });
  }, [api_endpoint]);

  return (
    <Chip
      label={`Padua API Status: ${status}`}
      color={status === "Healthy" ? "success" : "error"}
      onClick={() => window.open("https://mypadua.com", "_blank")}
    />
  );
};

export default function Home() {
  const [stillOnTop, setStillOnTop] = React.useState(false);
  const timeoutRef = React.useRef(null);

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setStillOnTop(false);
      clearTimeout(timeoutRef.current);
    } else {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setStillOnTop(true);
      }, 2000);
    }
  };

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    // Initial timeout in case the user doesn't scroll at all
    timeoutRef.current = setTimeout(() => {
      setStillOnTop(true);
    }, 2000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <WithNav>
      <WholeScreen>
        <Art
          lightModeSVG={"/forsyth/Branding/Logo_Black.svg"}
          darkModeSVG={"/forsyth/Branding/Logo_White.svg"}
        />
        <MoreToSee show={stillOnTop} />
      </WholeScreen>
      <WholeScreen>
        <Stack>
          <WhoAmI />
        </Stack>
      </WholeScreen>
      <Projects />
      <WholeScreen>
        <WorkExperience />
      </WholeScreen>
      <WholeScreen>
        <Contact />
      </WholeScreen>
      <WholeScreen>
        <Stack
          justifyContent="center"
          alignItems="center"
          spacing={2}
          sx={{ mt: 2 }}
        >
          <Typography variant="h6" align="center">
            Join the official Discord server for updates and more!
          </Typography>
          <FaDiscord size={32} />
          <Button variant="contained" href="https://discord.gg/bJc8gUBXDj">
            Join Discord
          </Button>
        </Stack>
      </WholeScreen>
      <WholeScreen>
        <Stack>
          <BuildStatus />
          <PaduaStatus api_endpoint="https://mypadua.com/api/health" />
        </Stack>
      </WholeScreen>
    </WithNav>
  );
}
