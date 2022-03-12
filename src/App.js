import React from "react";
import { Routes, Route } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Accounts from "./components/Dashboard/Accounts";
import Generator from "./components/Dashboard/Generator";
import Websites from "./components/Dashboard/Websites";
import AuthScreen from "./screens/auth";
import Dashboard from "./screens/dashboard";

const App = () => {
  return (
    <>
      <ToastContainer position="bottom-right" />
      <Routes>
        <Route path="/" element={<AuthScreen />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="accounts" element={<Accounts />} />
          <Route path="websites" element={<Websites />} />
          <Route path="generator" element={<Generator />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
