import { useSelector } from "react-redux";
import pattern from "../assets/pattern2.png";
import avatar from "../assets/man.png";
import { useEffect, useState } from "react";
import { auth } from "../config";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const userS = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  useEffect(() => {
    setUser(auth.currentUser);
  }, []);
  return (
    <>
      <button className="" onClick={() => navigate("/home")}>
        Home
      </button>
      <div className=" w-screen h-screen grid place-items-center p-5 bg-neutral-100 relative">
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
        </div>
      </div>
    </>
  );
};

export default Profile;
