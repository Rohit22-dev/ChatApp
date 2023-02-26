import { deleteUser } from "firebase/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../config";
import { setUser } from "../store";

const Confirm = ({ setToggleDelete }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClick = async () => {
    const user = auth.currentUser;
    await deleteUser(user)
      .then(() => {
        console.log("User deleted.");
        setToggleDelete(false);
        dispatch(setUser(null));
        navigate("/signin");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="bg-[#00000080] absolute w-screen h-screen z-10 grid place-items-center">
      <div className="flex flex-col justify-around items-center bg-white w-1/2 h-1/4 rounded-lg p-3 shadow-lg shadow-neutral-600">
        <blockquote className="text-xl font-semibold italic text-center text-slate-900">
          Are you sure , you want to{" "}
          <span className="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-red-500 relative inline-block">
            <span className="relative text-white">delete</span>
          </span>{" "}
          this account ?
        </blockquote>
        <div className="flex justify-around items-center w-full">
          <button
            className="bg-neutral-200 px-5 p-1 rounded-lg text-lg font-display hover:bg-neutral-300 shadow-sm shadow-gray-400"
            onClick={() => handleClick()}
          >
            Yes
          </button>
          <button
            className="bg-neutral-200 px-5 p-1 rounded-lg text-lg font-display hover:bg-neutral-300 shadow-sm shadow-gray-400 "
            onClick={() => setToggleDelete(false)}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
