import { HomeButton } from "./Button";
import { signOut } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../config";
import { setUser } from "../store";
import pattern from "../assets/pattern1.png";
import { IKImage } from "imagekitio-react";
import man from "../assets/man.png";
import { HiMenuAlt2 } from "react-icons/hi";

const Navbar = ({ sideBarToggle, setSideBarToggle }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

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
    <div className="navbar bg-base-100">
      <button className="flex-none lg:hidden p-2 hover:bg-[#444e62] rounded-lg">
        <HiMenuAlt2
          size={24}
          onClick={() => setSideBarToggle(!sideBarToggle)}
        />
      </button>
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">O-Chat</a>
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
