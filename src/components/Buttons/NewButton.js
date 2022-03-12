import React from "react";

import { Button, Typography } from "@mui/material";
import { green } from "@mui/material/colors";
import { Add } from "@mui/icons-material";

const NewButton = () => {
  return (
    <Button variant="contained" sx={{ bgcolor: green[500] }} size="small">
      <Add />
      <Typography variant="h6">New</Typography>
    </Button>
  );
};

export default NewButton;
