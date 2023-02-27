import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, provider, storage } from "../config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { FcGoogle } from "react-icons/fc";
import { useEffect, useState } from "react";
import chatting from "../assets/chatting_2.png";
import { useDispatch } from "react-redux";
import { setUser } from "../store";
import pattern from "../assets/pattern2.png";

const SignUp = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState({ firstName: "", lastName: "" });
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState("");
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const signInClicked = async () => {
    await signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log(user);
        dispatch(setUser(user));
        navigate("/");
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code.slice(5).replaceAll("-", " ");
        window.alert(errorCode.charAt(0).toUpperCase() + errorCode.slice(1));
        // const errorMessage = error.message;
        // const email = error.customData.email;
        // const credential = GoogleAuthProvider.credentialFromError(error);
        // console.log(errorMessage);
      });
  };
  // useEffect(() => {
  //   console.log(name, image);
  // }, [name, image]);

  const handleFormSubmit = async () => {
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // console.log(user);

        const imageName = `${user.uid}-${image.name}`;
        const imageRef = ref(storage, imageName);
        uploadBytes(imageRef, image)
          .then(() => {
            getDownloadURL(imageRef)
              .then((item) => {
                console.log(item);

                setImageURL(item);
                updateProfile(auth.currentUser, {
                  displayName: name.firstName + " " + name.lastName,
                  photoURL: imageURL,
                })
                  .then(() => {
                    console.log(imageURL);
                    console.log("Display name & image added to user metadata");
                  })
                  .catch((error) => {
                    console.log(error, "upload error");
                  });
              })
              .catch((e) => console.log(e));
          })
          .catch((e) => console.log(e));

        dispatch(setUser(user));
        navigate("/signin");
        // ...
      })
      .catch((error) => {
        // const errorCode = error.code.slice(5).replaceAll("-", " ");
        // window.alert(errorCode.charAt(0).toUpperCase() + errorCode.slice(1));
        console.log(error);
        // ..
      });
  };

  return (
    <div className="grid h-screen w-screen place-items-center bg-neutral-100">
      <img src={pattern} className="h-full w-full absolute object-fill" />
      <div className="z-10 grid grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1 lg:w-1/2 w-3/4 h-fit bg-clip-content rounded-lg neu p-4 gap-2">
        <div className="bg-cyan-500 rounded-lg flex justify-center gap-4 md:grid place-items-center relative">
          <p className="font-display text-5xl text-neutral-800 md:absolute top-16">
            Sign Up
          </p>
          <img
            src={chatting}
            alt="Chatting Man"
            className="h-48 object-cover z-10 hidden sm:block"
          />
        </div>
        <div className="flex flex-col justify-center bg-white rounded-lg border border-cyan-500 divide-y-2">
          <div className="p-3 flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-2">
              <input
                placeholder="First Name"
                type="text"
                onChange={(e) => setName({ firstName: e.target.value })}
                className="border-2 border-neutral-300 rounded-md p-2 focus:border-cyan-500 outline-none caret-cyan-500 "
              />
              <input
                placeholder="Last Name"
                type="text"
                onChange={(e) => setName({ lastName: e.target.value })}
                className="border-2 border-neutral-300 rounded-md p-2 focus:border-cyan-500 outline-none caret-cyan-500 "
              />
            </div>
            <input
              placeholder="Email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              className="border-2 border-neutral-300 rounded-md p-2 focus:border-cyan-500 outline-none caret-cyan-500"
            />
            <input
              placeholder="Passsword"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className="border-2 border-neutral-300 rounded-md p-2 focus:border-cyan-500 outline-none caret-cyan-500"
            />
            <input
              type="file"
              onChange={handleImageChange}
              accept="image/png, image/jpeg, image/webp, image/jpg"
              className="block w-full text-md text-slate-500 file:cursor-pointer
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-cyan-100 file:text-cyan-700
              hover:file:bg-cyan-200"
            />
            {/* <input type="file" className="" onChange={(e)=>setImage(e.target.value)} /> */}

            {/* <Button type="submit" color="cyan" value="Submit" /> */}

            <button
              className="bg-cyan-300 rounded-md p-2 border-2 border-cyan-500 text-slate-700 text-md font-bold"
              onClick={() => handleFormSubmit()}
            >
              Submit
            </button>
          </div>

          <div className="p-3 flex flex-col">
            <button
              className="bg-cyan-300 rounded-md p-2 border-2 border-cyan-500 flex justify-between items-center"
              onClick={() => signInClicked()}
            >
              <FcGoogle size={28} />
              <p className="text-slate-700 text-md font-bold flex-1">
                SignUp with google
              </p>{" "}
            </button>
            <p className="text-sm font-semibold m-1 text-neutral-700">
              Already have an account!{" "}
              <span
                className="text-cyan-600 cursor-pointer"
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
