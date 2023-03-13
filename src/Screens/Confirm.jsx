import { deleteUser, reauthenticateWithCredential } from "firebase/auth";
import { listAll, ref } from "firebase/storage";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth, storage } from "../config";
import { setUser } from "../store";

const Confirm = ({ setToggleDelete }) => {
  const [getCredentials, setGetCredentials] = useState(false);
  const [promptPassword, setPromptPassword] = useState("");
  const [googleProvider, setGoogleProvider] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = auth.currentUser;

  const handleProvider = () => {
    const provider = user.providerData.find(
      (provider) => provider.providerId === "google.com"
    );
    setGoogleProvider(provider);
    console.log(provider);
    {
      provider && handleClick();
    }
  };

  const handleClick = async () => {
    if (user) {
      if (googleProvider) {
        // User signed in with Google, no need to ask for password
        deleteUser(user)
          .then(() => {
            console.log("User deleted.");
            setToggleDelete(false);
            dispatch(setUser(null));
            navigate("/signup");
          })
          .catch((error) => {
            console.log("Error deleting user", error);
          });
        return;
      }

      // Prompt for password
      const credential = auth.EmailAuthProvider.credential(
        user.email,
        promptPassword
      );
      console.log(credential);

      await reauthenticateWithCredential(user, credential)
        .then(() => {
          // Delete user and navigate to signup page
          deleteUser(user)
            .then(() => {
              console.log("User deleted.");
              setToggleDelete(false);
              dispatch(setUser(null));
              navigate("/signup");

              // Delete user's images from storage
              const storageRef = ref(storage);

              listAll(storageRef)
                .then((res) => {
                  // Filter the items based on their metadata
                  const userImages = res.items.filter((item) => {
                    const metadata = item.getMetadataSync();
                    return metadata.customMetadata.uid === user.uid;
                  });

                  // Delete each item that matches the metadata
                  userImages.forEach((item) => {
                    deleteObject(item)
                      .then(() => {
                        console.log(`Deleted image: ${item.name}`);
                      })
                      .catch((error) => {
                        console.log(
                          `Error deleting image: ${item.name}`,
                          error
                        );
                      });
                  });
                })
                .catch((error) => {
                  console.log("Error listing items", error);
                });
            })
            .catch((error) => {
              console.log("Error deleting user", error);
            });
        })
        .catch((error) => {
          console.log("Error reauthenticating user", error);
        });
    }
  };

  return (
    <div className="bg-[#00000080] backdrop-blur-sm absolute w-screen h-screen z-10 grid place-items-center">
      {getCredentials & googleProvider ? (
        <div className="flex flex-col justify-around items-center bg-white w-1/2 h-1/4 rounded-lg p-3 shadow-lg shadow-neutral-600">
          <blockquote className="text-xl font-semibold italic text-center text-slate-900">
            Enter your current &nbsp;
            <span className="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-red-500 relative inline-block">
              <span className="relative text-white">Password</span>
            </span>
            &nbsp;.
          </blockquote>
          <input
            placeholder="Password"
            className="border-2 bg-neutral-50 outline-none focus:border-red-500 font-semibold border-neutral-300 p-2 rounded-xl caret-red-500"
            onChange={(e) => setPromptPassword(e.target.value)}
          />
          <button
            className="bg-neutral-200 px-5 p-1 rounded-lg text-lg font-display hover:bg-neutral-300 shadow-sm shadow-gray-400"
            onClick={() => handleClick()}
          >
            Confirm
          </button>
        </div>
      ) : (
        <div className="flex flex-col justify-around items-center bg-white w-1/2 h-1/4 rounded-lg p-3 shadow-lg shadow-neutral-600">
          <blockquote className="text-xl font-semibold italic text-center text-slate-900">
            Are you sure , you want to&nbsp;
            <span className="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-red-500 relative inline-block">
              <span className="relative text-white">delete</span>
            </span>
            &nbsp; this account ?
          </blockquote>
          <div className="flex justify-around items-center w-full">
            <button
              className="bg-neutral-200 px-5 p-1 rounded-lg text-lg font-display hover:bg-neutral-300 shadow-sm shadow-gray-400"
              onClick={() => {
                setGetCredentials(true), handleProvider();
              }}
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
      )}
    </div>
  );
};

export default Confirm;
