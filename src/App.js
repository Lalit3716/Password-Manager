import React from "react";
import { Routes, Route } from "react-router";
import Accounts from "./components/Dashboard/Accounts";
import Websites from "./components/Dashboard/Websites";
import AuthScreen from "./screens/auth";
import Dashboard from "./screens/dashboard";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthScreen />} />
      <Route path="/dashboard" element={<Dashboard />}>
        <Route path="accounts" element={<Accounts />} />
        <Route path="websites" element={<Websites />} />
      </Route>
    </Routes>
  );
};

export default App;
