import { useSelector } from "react-redux";
import pattern from "../assets/pattern2.png";
import avatar from "../assets/man.png";
import { useNavigate } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { BsImageFill } from "react-icons/bs";
import { useState } from "react";
import Confirm from "./Confirm";

const Profile = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [toggleDelete, setToggleDelete] = useState(false);

  return (
    <div className=" w-screen h-screen grid place-items-center p-5 bg-neutral-100 relative">
      <div
        className="hover:cursor-pointer z-10 top-8 left-12 absolute p-3 border-b-4 border-l-4 border-neutral-800 bg-rose-500 rounded-full rotate-45 rounded-bl-none group"
        onClick={() => navigate("/")}
      >
        <FaHome
          size={28}
          className="-rotate-45 group-hover:scale-110 duration-150 ease-in-out"
        />
      </div>
      <img src={pattern} className="h-full w-full absolute object-fill" />
      <div className="z-10 grid grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1 w-3/4 h-3/4 rounded-lg neu p-5 gap-2 bg-clip-content">
        <div className="bg-rose-500 rounded-lg flex flex-col items-center justify-center gap-8 ">
          <div className="w-2/5 border-[6px] rounded-full  border-neutral-400 bg-white overflow-hidden">
            <img
              src={user && user.photoURL ? user.photoURL : avatar}
              className="w-full h-full object-fill"
            />
          </div>
          <p className="font-display text-4xl text-neutral-800">
            {user && user.displayName ? user.displayName : "User Name"}
          </p>
          <p className="font-display text-2xl text-neutral-800">
            {user && user.email ? user.email : "User Email"}
          </p>
        </div>
        <div className="flex gap-3 justify-center items-center bg-neutral-100 rounded-lg">
          <button className="bg-lime-300 hover:bg-lime-400 group p-5 rounded-full rounded-br-none">
            <BsImageFill
              size={32}
              className="group-hover:scale-110 ease-in-out duration-200"
            />
          </button>
          <button
            className="bg-teal-300 hover:bg-teal-400 group p-5 rounded-full rounded-bl-none"
            onClick={() => setToggleDelete(true)}
          >
            <FaTrashAlt
              size={32}
              className="group-hover:scale-110 ease-in-out duration-200"
            />
          </button>
        </div>
      </div>
      {toggleDelete && <Confirm setToggleDelete={setToggleDelete} />}
    </div>
  );
};

export default Profile;
