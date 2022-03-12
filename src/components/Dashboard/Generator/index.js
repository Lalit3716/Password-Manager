import React from "react";
import { Typography, Box, Stack, Switch, Button } from "@mui/material";

const Generator = () => {
  return (
    <Box
      height="100%"
      width="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Stack spacing={2} alignItems="center">
        <Typography variant="h4">Password Generator</Typography>
        <Button variant="contained" color="primary">
          Generate
        </Button>
        <Stack spacing={2} alignItems="start">
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
          >
            <Typography variant="h6">Uppercase Letters (A-Z)</Typography>
            <Switch />
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
          >
            <Typography variant="h6">Lowercase Letters (a-z)</Typography>
            <Switch />
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
          >
            <Typography variant="h6">Numbers (0-9)</Typography>
            <Switch />
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
          >
            <Typography variant="h6">
              Special Characters (!@#$%^&*()_+-=)
            </Typography>
            <Switch />
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Generator;
