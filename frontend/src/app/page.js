"use client";

import WithNav from "@/comps/PageWrappers/WithNav.jsx";
import Art from "@/comps/Art/StandardArt.jsx";
import WholeScreen, { useAdjustScroll } from "@/comps/Frames/WholeScreen";
import Contact from "@/comps/Toolbox/Contact";
import WhoAmI from "@/comps/Toolbox/WhoAmI";
import WorkExperience from "@/comps/Toolbox/WorkExperience";
import Projects from "@/comps/Toolbox/Projects";

// discord icon
import { FaDiscord } from "react-icons/fa";

import { Button, Stack, Typography } from "@mui/material";

export default function Home() {
  useAdjustScroll();

  return (
    <WithNav>
      <WholeScreen>
        <Art
          lightModeSVG={"/forsyth/Branding/Logo_Black.svg"}
          darkModeSVG={"/forsyth/Branding/Logo_White.svg"}
        />
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
    </WithNav>
  );
}
