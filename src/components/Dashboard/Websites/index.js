import React from "react";
import { Box, Typography } from "@mui/material";
import NewButton from "../../Buttons/NewButton";

const Websites = () => {
  return (
    <Box height="100%" width="100%">
      <NewButton />
      <Typography variant="h6" mt={2}>
        No websites found
      </Typography>
    </Box>
  );
};

export default Websites;
