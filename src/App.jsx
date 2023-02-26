import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./Screens/Home";
import Profile from "./Screens/Profile";
import SignIn from "./Screens/SignIn";
import SignUp from "./Screens/SignUp";

const App = () => {
  const user = useSelector((state) => state.user);
  return (
    <Routes>
      <Route path="/" element={user ? <Home /> : <Navigate to="/signin" />} />
      <Route path="signin" element={<SignIn />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="profile" element={<Profile />} />
    </Routes>
    // <Profile />
  );
};

export default App;
