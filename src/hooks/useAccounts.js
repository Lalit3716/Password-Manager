import { useState, useEffect } from "react";

const useAccounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.db.getAllAccounts().then(accounts => {
      setAccounts(accounts);
      setLoading(false);
    });
  }, []);

  return { accounts, loading };
};

export default useAccounts;
