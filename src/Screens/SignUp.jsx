import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendEmailVerification,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, provider, storage } from "../config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { FcGoogle } from "react-icons/fc";
import { BsFillEyeFill } from "react-icons/bs";
import { BsFillEyeSlashFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import chatting from "../assets/chatting_2.png";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setUser } from "../store";
import pattern from "../assets/pattern2.png";
import { doc, setDoc } from "firebase/firestore";
import { FaMoon, FaSun } from "react-icons/fa";

const SignUp = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState({ firstName: "", lastName: "" });
  const [image, setImage] = useState(null);
  const [seePSW, setSeePSW] = useState(true);
  const navigate = useNavigate();
  const mode = useSelector((state) => state.mode);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const signInClicked = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      //create user on firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      });

      //create empty user chats on firestore
      await setDoc(doc(db, "userChats", user.uid), {});
      console.log(user);
      dispatch(setUser(user));
      navigate("/");
    } catch (error) {
      const errorCode = error.code.slice(5).replaceAll("-", " ");
      window.alert(errorCode.charAt(0).toUpperCase() + errorCode.slice(1));
      // const errorMessage = error.message;
      // const email = error.customData.email;
      // const credential = GoogleAuthProvider.credentialFromError(error);
      // console.log(errorMessage);
    }
  };
  // useEffect(() => {
  //   console.log("iamge", imageURL);
  // }, [imageURL]);

  // const handleFormSubmit = async () => {
  //   const displayName = name.firstName + " " + name.lastName;
  //   await createUserWithEmailAndPassword(auth, email, password)
  //     .then(async (userCredential) => {
  //       // Signed in
  //       const user = userCredential.user;
  //       // console.log(user);

  //       // Send email verification
  //       // await sendEmailVerification(user)
  //       //   .then((test) => {
  //       //     console.log(test);
  //       //     window.alert("Verification email sent");
  //       //   })
  //       //   .catch((error) => {
  //       //     console.log(error);
  //       //   });

  //       // const imageName = `${user.uid}-${image.name}`;
  //       const imageRef = ref(storage, image.name);
  //       // console.log(name);
  //       const metadata = {
  //         contentType: image.type,
  //         customMetadata: {
  //           uid: user.uid,
  //         },
  //       };
  //       uploadBytes(imageRef, image, metadata)
  //         .then(() => {
  //           getDownloadURL(imageRef)
  //             .then(async (url) => {
  //               console.log(url);
  //               await updateProfile(auth.currentUser, {
  //                 displayName: displayName,
  //                 photoURL: url,
  //               })
  //                 .then(() => {
  //                   console.log("Display name & image added to user metadata");
  //                   dispatch(setUser(user));
  //                   navigate("/");
  //                   console.log("Please verify your email.");
  //                 })
  //                 .catch((error) => {
  //                   console.log(error, "upload error");
  //                 });

  //               //create user on firestore
  //               await setDoc(doc(db, "users", user.uid), {
  //                 uid: user.uid,
  //                 displayName,
  //                 email,
  //                 photoURL: url,
  //               });

  //               //create empty user chats on firestore
  //               await setDoc(doc(db, "userChats", user.uid), {});
  //             })
  //             .catch((e) => console.log(e));
  //         })
  //         .catch((e) => console.log(e));

  //       // ...
  //     })
  //     .catch((error) => {
  //       // const errorCode = error.code.slice(5).replaceAll("-", " ");
  //       // window.alert(errorCode.charAt(0).toUpperCase() + errorCode.slice(1));
  //       console.log(error);
  //       // ..
  //     });
  // };
  const handleFormSubmit = async () => {
    setLoading(true);
    const displayName = name.firstName + " " + name.lastName;
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const imageRef = ref(storage, image.name);
      const metadata = {
        contentType: image.type,
        customMetadata: {
          uid: user.uid,
        },
      };
      await uploadBytes(imageRef, image, metadata);
      const url = await getDownloadURL(imageRef);
      await updateProfile(auth.currentUser, {
        displayName: displayName,
        photoURL: url,
      });
      dispatch(setUser(user));
      setLoading(false);
      navigate("/");
      console.log("Please verify your email.");

      //create user on firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        displayName,
        email,
        photoURL: url,
      });

      //create empty user chats on firestore
      await setDoc(doc(db, "userChats", user.uid), {});
    } catch (error) {
      console.log(error);
      window.alert(error);
      // handle specific errors here
    }
  };

  const handleClick = () => {
    dispatch(setMode());
  };

  return (
    <div
      className="grid h-screen w-screen place-items-center bg-base-100 "
      data-theme={mode === "light" ? "emerald" : "dark"}
    >
      {/* <img src={pattern} className="h-full w-full absolute object-fill" /> */}

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

      <div className="z-10 grid grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1 lg:w-1/2 w-3/4 min-h-[75%] bg-clip-content rounded-lg shadow-lg shadow-base-300 p-4 gap-2">
        <div className="bg-primary rounded-lg flex justify-center gap-4 md:grid place-items-center relative">
          <p className="font-display text-5xl text-base-content md:absolute top-16">
            Sign Up
          </p>
          <img
            src={chatting}
            alt="Chatting Man"
            className="h-48 object-cover z-10 hidden sm:block"
          />
        </div>
        <div className="flex flex-col justify-center bg-base-100 rounded-lg border border-primary divide-y-2">
          <div className="p-3 flex flex-col gap-4 text-base-content">
            <div className="grid grid-cols-2 gap-2">
              <input
                placeholder="First Name"
                type="text"
                onChange={(e) =>
                  setName({ ...name, firstName: e.target.value })
                }
                className="border-2 border-base-300 rounded-md p-2 focus:border-primary outline-none caret-primary "
              />
              <input
                placeholder="Last Name"
                type="text"
                onChange={(e) => setName({ ...name, lastName: e.target.value })}
                className="border-2 border-base-300 rounded-md p-2 focus:border-primary outline-none caret-primary "
              />
            </div>
            <input
              placeholder="Email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              className="border-2 border-base-300 rounded-md p-2 focus:border-primary outline-none caret-primary"
            />
            <div className="relative">
              <input
                placeholder="Passsword"
                type={seePSW ? "password" : "text"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-2 w-full border-base-300 rounded-md p-2 focus:border-primary outline-none caret-primary"
              />
              <div
                className="absolute right-3 top-0 translate-y-[80%] cursor-pointer scale-125 text-base-content"
                onClick={() => setSeePSW(!seePSW)}
              >
                {seePSW ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
              </div>
            </div>
            <input
              type="file"
              required
              onChange={handleImageChange}
              accept="image/png, image/jpeg, image/webp, image/jpg"
              className="block w-full text-md text-base-content file:cursor-pointer
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-primary file:text-base-content
              hover:file:bg-primary"
            />
            {/* <input type="file" className="" onChange={(e)=>setImage(e.target.value)} /> */}

            {/* <Button type="submit" color="primarylue="Submit" /> */}

            <button
              className="bg-primary rounded-md p-2 border-2 border-primary-focus text-base-content text-md font-bold"
              onClick={() => handleFormSubmit()}
            >
              Submit
            </button>
            {loading && (
              <span className="text-sm font-semibold">
                Creating new id & chatspace. Please wait...
              </span>
            )}
          </div>

          <div className="p-3 flex flex-col">
            <button
              className="bg-primary rounded-md p-2 border-2 border-primary-focus flex justify-between items-center"
              onClick={() => signInClicked()}
            >
              <FcGoogle size={28} />
              <p className="text-base-content text-md font-bold flex-1">
                SignUp with google
              </p>{" "}
            </button>
            <p className="text-sm font-semibold m-1 text-base-700">
              Already have an account!{" "}
              <span
                className="text-primary cursor-pointer"
                onClick={() => navigate("/signIn")}
              >
                SignIn
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
