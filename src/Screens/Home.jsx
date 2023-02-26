import { signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../config";
import { setUser } from "../store";

const Home = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    // console.log(auth.currentUser);
    console.log(user);
  }, []);

  const signOutClicked = async () => {
    await signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("Signed out sucessfully");
        dispatch(setUser(null));
        navigate("/signin");
        console.log("object", user);
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };
  return (
    <div className="flex gap-5">
      <p className="text">HomePage</p>
      <button onClick={() => signOutClicked()}>SignOut</button>
      <button onClick={() => navigate("/profile")}>Profile</button>
      <p>{user.displayName}</p>
    </div>
  );
};

export default Home;
