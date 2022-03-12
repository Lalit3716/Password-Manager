import React, { useState } from "react";
import {
  Avatar,
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router";

const AuthScreen = () => {
  const navigate = useNavigate();
  const [mainPass, setMainPass] = useState("");
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState(null);

  const onUnlock = () => {
    if (mainPass === "password") {
      navigate("/dashboard/accounts");
    } else {
      setError("Incorrect password, please try again.");
    }
  };

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
          type={visible ? "text" : "password"}
          value={mainPass}
          onChange={e => {
            if (error) {
              setError(null);
            }
            setMainPass(e.target.value);
          }}
          InputProps={{
            endAdornment: (
              <IconButton onClick={() => setVisible(!visible)}>
                {visible ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            ),
          }}
        />
        {error && (
          <Typography variant="body2" color="error">
            {error}
          </Typography>
        )}
        <Button
          variant="contained"
          color="primary"
          size="large"
          disabled={mainPass.trim() === ""}
          onClick={onUnlock}
          fullWidth
        >
          Unlock
        </Button>
      </Stack>
    </Stack>
  );
};

export default AuthScreen;
