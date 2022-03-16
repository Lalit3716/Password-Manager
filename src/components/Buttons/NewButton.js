import React, { useState } from "react";

import {
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { green } from "@mui/material/colors";
import { Add } from "@mui/icons-material";

import NewAccountForm from "../Forms/NewAccount";

const NewButton = ({ onSuccess }) => {
  const [open, setOpen] = useState(false);

  const onFormSuccess = account => {
    setOpen(false);
    onSuccess(account);
  };

  return (
    <>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>New Account</DialogTitle>
        <DialogContent>
          <NewAccountForm onSuccess={onFormSuccess} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
      <Button
        variant="contained"
        sx={{ bgcolor: green[500] }}
        size="small"
        onClick={() => setOpen(true)}
      >
        <Add />
        <Typography variant="h6">New</Typography>
      </Button>
    </>
  );
};

export default NewButton;
