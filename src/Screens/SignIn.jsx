import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../config";
import { FcGoogle } from "react-icons/fc";
import { BsFillEyeFill } from "react-icons/bs";
import { BsFillEyeSlashFill } from "react-icons/bs";
import { useState } from "react";
import chatting from "../assets/chatting.png";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setUser } from "../store";
import pattern from "../assets/pattern2.png";
import { FaMoon, FaSun } from "react-icons/fa";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [seePSW, setSeePSW] = useState(true);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const mode = useSelector((state) => state.mode);
  const dispatch = useDispatch();

  const signInClicked = async () => {
    await signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log(user, "asd");
        dispatch(setUser(user));
        navigate("/");
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  const handleFormSubmit = async () => {
    setLoading(true);
    console.log("object");
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        dispatch(setUser(user));
        setLoading(false);
        navigate("/");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        window.alert(errorCode);
        // console.log(errorMessage);
      });
  };

  const handleClick = () => {
    dispatch(setMode());
  };

  return (
    <div
      className="grid h-screen w-screen place-items-center bg-base-100 relative "
      data-theme={mode === "light" ? "acid" : "dark"}
    >
      {/* <img src={pattern} className="h-full w-full absolute object-fill" /> */}

      <div className="absolute top-5 right-10 border border-secondary-focus rounded-full p-2 cursor-pointer">
        {mode === "light" ? (
          <FaSun
            className="text-secondary"
            onClick={() => handleClick()}
            size={26}
          />
        ) : (
          <FaMoon
            className="text-secondary"
            onClick={() => handleClick()}
            size={26}
          />
        )}
      </div>

      <div className="z-10 grid grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1 lg:w-1/2 w-3/4 h-3/4 bg-clip-content rounded-lg shadow-lg shadow-base-300 p-4 gap-2">
        <div className="bg-secondary rounded-lg flex justify-center gap-4 md:grid place-items-center relative">
          <p className="font-display text-5xl text-base-content md:absolute top-16">
            Sign In
          </p>
          <img
            src={chatting}
            alt="Chatting Man"
            className="h-48 object-cover z-10 hidden sm:block"
          />
        </div>

        <div className="flex flex-col justify-center bg-base-100 rounded-lg border border-secondary divide-y-2">
          <div
            // onSubmit={() => handleFormSubmit()}
            className="p-3 flex flex-col gap-4 text-base-content"
          >
            <input
              placeholder="Email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              className="border-2 border-base-300 rounded-md p-2 focus:border-secondary outline-none caret-secondary"
            />
            <div className="relative">
              <input
                placeholder="Passsword"
                type={seePSW ? "password" : "text"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-2 w-full border-base-300 rounded-md p-2 focus:border-secondary outline-none caret-secondary"
              />
              <div
                className="absolute right-3 top-0 translate-y-[80%] cursor-pointer scale-125 text-base-content"
                onClick={() => setSeePSW(!seePSW)}
              >
                {seePSW ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
              </div>
            </div>

            {/* <Button
              color="
              secondary="Submit"
              onClick={() => handleFormSubmit()}
            /> */}
            <button
              className="bg-secondary rounded-md p-2 border-2 border-secondary-focus text-base-content text-md font-bold"
              onClick={() => handleFormSubmit()}
            >
              Submit
            </button>
            {loading && (
              <span className="text-sm font-semibold">
                Loading data. Please wait...
              </span>
            )}
          </div>

          <div className="p-3 flex flex-col">
            <button
              className="bg-secondary rounded-md p-2 border-2 border-secondary-focus flex justify-between items-center"
              onClick={() => signInClicked()}
            >
              <FcGoogle size={28} />
              <p className="text-base-content text-md font-bold flex-1">
                SignIn with google
              </p>{" "}
            </button>
            <p className="text-sm font-semibold m-1 text-base-content">
              Don't have an account!{" "}
              <span
                className="text-secondary cursor-pointer"
                onClick={() => navigate("/signup")}
              >
                SignUp
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
