import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages";
import EmailPage from "./pages/EmailPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/email" element={<EmailPage />} />
      </Routes>
    </>
  );
}

export default App;
