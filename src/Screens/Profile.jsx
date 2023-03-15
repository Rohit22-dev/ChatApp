import { useDispatch, useSelector } from "react-redux";
import pattern from "../assets/pattern2.png";
import { useNavigate } from "react-router-dom";
import {
  FaGithubAlt,
  FaGlobe,
  FaLinkedinIn,
  FaMoon,
  FaSlackHash,
  FaSun,
  FaTrashAlt,
} from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { BsImageFill } from "react-icons/bs";
import { BsShieldLockFill } from "react-icons/bs";
import { AiTwotoneEdit } from "react-icons/ai";
import { useState } from "react";
import { ProfileButton } from "../components/Button";
import { setMode } from "../store";

const Profile = () => {
  const { user, mode } = useSelector((state) => ({
    user: state.user,
    mode: state.mode,
  }));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [toggleDelete, setToggleDelete] = useState(true);
  // const [getCredentials, setGetCredentials] = useState(false);
  const handleClick = () => {
    dispatch(setMode());
  };

  return (
    <div className=" w-screen h-screen grid place-items-center bg-base-100 relative" data-theme={mode==="light"?"autumn":"dark"}>
      <div className="absolute top-5 right-10 border border-primary-focus rounded-full p-2 cursor-pointer">
        {mode === "light" ? (
          <FaSun
            className="text-primary"
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
      <div
        className="hover:cursor-pointer z-10 top-3 left-5 absolute p-3 border-primary bg-base-200 rounded-full rounded-bl-none rotate-45 group border-l-4 border-b-4 border-2"
        onClick={() => navigate("/")}
      >
        <FaHome
          size={28}
          className="-rotate-45 group-hover:scale-110 duration-150 ease-in-out text-base-content"
        />
      </div>
      <div className="hero min-h-1/2 w-3/4 md:w-3/5 lg:w-1/2 rounded-lg bg-base-200 shadow-md shadow-base-300">
        <div className="hero-content flex flex-col">
          <img src={user.photoURL} className="w-40 rounded-lg shadow-2xl" />
          <div className="flex flex-col items-center">
            <h1 className="text-5xl font-bold">{user.displayName}</h1>
            <p className="py-6 sm:mx-12 md:mx-20 lg:mx-32">
              This page is under construction. Please be patient . I will try to
              complete it with some innovative design and ideas ASAP.
            </p>

            <div className="tooltip" data-tip="Under Construction">
              <button className="btn btn-primary">Get Started</button>
            </div>
          </div>
        </div>
      </div>
      <footer className="footer items-center p-4 bg-neutral absolute bottom-0 text-neutral-content">
        <div className="items-center grid-flow-col">
          <FaSlackHash size={36} />
          <p>
            Copyright © 2023 - All right reserved. Be careful with my creation
          </p>
        </div>
        <div className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
          <a
            className="cursor-pointer"
            target="_blank"
            href="https://github.com/Rohit22-dev"
          >
            <FaGithubAlt size={26} />
          </a>
          <a
            className="cursor-pointer"
            target="_blank"
            href="https://rkcode.codes/"
          >
            <FaGlobe size={24} />
          </a>
          <a
            className="cursor-pointer"
            target="_blank"
            href="https://www.linkedin.com/in/rohit-kumar-78322b207"
          >
            <FaLinkedinIn size={24} />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Profile;
