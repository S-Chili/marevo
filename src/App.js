import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import SignUp from "./components/Header/SignUp";
import SignIn from "./components/Header/SignIn";
import UserPage from "./components/Header/UserPage";

function App() {
  const [value, setValue] = useState(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Router basename="/marevo">
      <Header value={value} handleChange={handleChange} />
      <Routes>
        <Route
          path="/"
          element={<Home value={value} handleChange={handleChange} />}
        />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/mypage" element={<UserPage />} />
      </Routes>
    </Router>
  );
}

export default App;
