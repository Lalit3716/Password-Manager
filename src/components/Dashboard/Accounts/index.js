import React from "react";
import useAccounts from "../../../hooks/useAccounts";

import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import NewButton from "../../Buttons/NewButton";

const Accounts = () => {
  const { accounts, loading } = useAccounts();

  return (
    <Box width="100%" height="100%">
      <NewButton />
      {accounts.length === 0 && !loading && (
        <Typography variant="h6">No accounts found</Typography>
      )}
    </Box>
  );
};

export default Accounts;
