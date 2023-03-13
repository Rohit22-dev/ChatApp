import { current } from "@reduxjs/toolkit";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../config";
import { setChatUser } from "../store";

const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);
  const currentUser = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleSearch = async () => {
    console.log(currentUser);
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (error) {
      setErr(true);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    dispatch(setChatUser(user));
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {}

    setUser(null);
    setUsername("");
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Find a user"
        className=" w-full max-w-xs placeholder:text-white text-white outline-none pb-4 px-2"
        onKeyDown={handleKey}
        onChange={(e) => setUsername(e.target.value)}
        value={username}
      />
      {err && <span>User not found</span>}
      {user && (
        <div
          className="flex gap-2 p-4 cursor-pointer hover:bg-base-100 rounded-lg"
          onClick={handleSelect}
        >
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-12 rounded-full">
              <img src={user.photoURL} />
            </div>
          </label>
          <div className="flex flex-col justify-center">
            <p className="font-bold">{user.displayName}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
