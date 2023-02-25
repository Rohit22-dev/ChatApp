import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Screens/Home";
import Profile from "./Screens/Profile";
import SignIn from "./Screens/SignIn";
import SignUp from "./Screens/SignUp";

const App = () => {
  return (
    <Routes>
      <Route path="home" element={<Home />} />
      <Route path="signin" element={<SignIn />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="profile" element={<Profile />} />
    </Routes>
    // <Profile />
  );
};

export default App;
