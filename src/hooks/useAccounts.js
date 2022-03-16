import { useState, useEffect, useContext } from "react";
import authContext from "../context/AuthContext";

const useAccounts = () => {
  const { mainPass } = useContext(authContext);
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.db.getAllAccounts().then(accounts => {
      setAccounts(
        accounts.map(account => ({
          ...account,
          password: window.electronCrypto.decrypt(account.password, mainPass),
          email: window.electronCrypto.decrypt(account.email, mainPass),
        }))
      );
      setLoading(false);
    });
  }, [mainPass]);

  const addAccount = account => {
    setAccounts([...accounts, account]);
  };

  const deleteAccount = id => {
    setAccounts(accounts.filter(account => account.id !== id));
  };

  const updateAccount = account => {
    setAccounts(accounts.map(a => (a.id === account.id ? account : a)));
  };

  return { loading, accounts, addAccount, deleteAccount, updateAccount };
};

export default useAccounts;
