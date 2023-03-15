import { HomeButton } from "./Button";
import { signOut } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../config";
import { setMode, setUser } from "../store";
import pattern from "../assets/pattern1.png";
import { IKImage } from "imagekitio-react";
import man from "../assets/man.png";
import { HiMenuAlt2 } from "react-icons/hi";
import { FaMoon, FaSun } from "react-icons/fa";

const Navbar = ({ sideBarToggle, setSideBarToggle }) => {
  const navigate = useNavigate();
  const { user, mode } = useSelector((state) => ({
    user: state.user,
    mode: state.mode,
  }));
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(setMode());
  };

  // useEffect(() => {
  //   // console.log(auth.currentUser);
  //   console.log(user);
  // }, [user]);

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
    <div className="navbar bg-base-300 px-5 gap-5">
      <button className="flex-none lg:hidden p-2 hover:bg-[#444e62] rounded-lg">
        <HiMenuAlt2
          size={24}
          onClick={() => setSideBarToggle(!sideBarToggle)}
        />
      </button>
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">O-Chat</a>
      </div>
      {/* 
      <label className="swap swap-rotate">
        <input type="checkbox" />

        <FaSun
          className="swap-on text-base-content"
          onClick={() => handleClick()}
          size={26}
        />

        <FaMoon
          className="swap-off text-base-content"
          onClick={() => handleClick()}
          size={26}
        />
      </label> */}
      <div className="">
        {mode === "light" ? (
          <FaSun
            className="text-base-content"
            onClick={() => handleClick()}
            size={26}
          />
        ) : (
          <FaMoon
            className="text-primary"
            onClick={() => handleClick()}
            size={26}
          />
        )}
      </div>

      <div className="flex-none gap-2">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src={user.photoURL} />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <p onClick={() => navigate("/profile")}>Profile</p>
            </li>
            <li>
              <p>Settings</p>
            </li>
            <li>
              <p onClick={() => signOutClicked()}>Logout</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
