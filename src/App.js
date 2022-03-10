import React, { useState } from "react";
import { Avatar, Button, Stack, TextField, Typography } from "@mui/material";

const App = () => {
  const [mainPass, setMainPass] = useState("");

  return (
    <Stack
      height="100vh"
      width="100vw"
      justifyContent="center"
      alignItems="center"
      spacing={2}
    >
      <Avatar
        src="/logo.jpg"
        alt="logo"
        sx={{
          width: "200px",
          height: "200px",
        }}
      />
      <Typography variant="h6">
        Vault is locked. Enter your main password below.
      </Typography>
      <Stack spacing={2}>
        <TextField
          label="Password"
          type="password"
          value={mainPass}
          onChange={e => setMainPass(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          size="large"
          disabled={mainPass.trim() === ""}
          fullWidth
        >
          Unlock
        </Button>
      </Stack>
    </Stack>
  );
};

export default App;
