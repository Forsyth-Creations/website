import React from "react";
import { Container, Typography, Box, Grid } from "@mui/material";

const BrandingPage = () => {
  return (
    <Container sx={{ padding: "20px" }}>
      <Typography variant="h1" gutterBottom>
        Branding Page
      </Typography>

      <Box component="section" sx={{ marginBottom: "20px" }}>
        <Typography variant="h2" gutterBottom>
          Images
        </Typography>
        <Box>
          <img
            src="/path/to/logo.png"
            alt="Logo"
            style={{ width: "200px", margin: "10px" }}
          />
          <img
            src="/path/to/banner.png"
            alt="Banner"
            style={{ width: "400px", margin: "10px" }}
          />
        </Box>
      </Box>

      <Box component="section">
        <Typography variant="h2" gutterBottom>
          Color Swatches
        </Typography>
        <Grid container spacing={2}>
          <Grid item>
            <Box
              sx={{
                backgroundColor: "#FF5733",
                width: "100px",
                height: "100px",
              }}
            ></Box>
          </Grid>
          <Grid item>
            <Box
              sx={{
                backgroundColor: "#33FF57",
                width: "100px",
                height: "100px",
              }}
            ></Box>
          </Grid>
          <Grid item>
            <Box
              sx={{
                backgroundColor: "#3357FF",
                width: "100px",
                height: "100px",
              }}
            ></Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default BrandingPage;
