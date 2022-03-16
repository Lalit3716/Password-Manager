import React, { useState } from "react";
import { Card, IconButton, Box, Typography } from "@mui/material";
import AccountCard from "../AccountCard";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

const AccountCarasoul = props => {
  const { accounts, update, delete: deleteAccount } = props;
  const [current, setCurrent] = useState(0);

  const handleNext = () => setCurrent(current + 1);
  const handlePrev = () => setCurrent(current - 1);

  const handleDelete = () => {
    console.log(current);
    if (current === 0) {
      deleteAccount(accounts[current].id);
      handleNext();
      console.log(current);
    } else if (current === accounts.length - 1) {
      deleteAccount(accounts[current].id);
      handlePrev();
      console.log(current);
    } else {
      deleteAccount(accounts[current].id);
    }
  };

  return (
    <Card
      elevation={5}
      sx={{ width: "400px", m: 1, position: "relative", px: 3 }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: 1,
          transform: "translateY(-50%)",
        }}
      >
        <IconButton onClick={handlePrev} disabled={current === 0}>
          <ArrowBack />
        </IconButton>
      </Box>
      {accounts[current] && (
        <AccountCard
          account={accounts[current]}
          onUpdate={update}
          onDelete={handleDelete}
        />
      )}
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          right: 2,
          transform: "translateY(-50%)",
        }}
      >
        <IconButton
          onClick={handleNext}
          disabled={current === accounts.length - 1}
        >
          <ArrowForward />
        </IconButton>
      </Box>
      <Typography variant="body1" sx={{ textAlign: "center", mb: 2 }}>
        {current + 1}/{accounts.length}
      </Typography>
    </Card>
  );
};

export default AccountCarasoul;
