import React from "react";
import useAccounts from "../../../hooks/useAccounts";

import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import NewButton from "../../Buttons/NewButton";
import AccountCard from "../../AccountCard";

const Accounts = () => {
  const { accounts, loading, addAccount, deleteAccount, updateAccount } =
    useAccounts();

  return (
    <Box width="100%" height="100%">
      <NewButton onSuccess={addAccount} />
      {!loading && accounts.length === 0 ? (
        <Typography variant="h6" mt={2}>
          No accounts found
        </Typography>
      ) : (
        <Box
          mt={2}
          sx={{
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {accounts.map(account => (
            <AccountCard
              key={account.id}
              account={account}
              onDelete={deleteAccount}
              onUpdate={updateAccount}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Accounts;
