import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import man from "../assets/man.png";
import { db } from "../config";
import { setChatUser } from "../store";
import Search from "./Search";

const Sidebar = () => {
  const dispatch = useDispatch();
  const [chats, setChats] = useState([]);
  const currentUser = useSelector((state) => state.user);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
        // console.log(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    console.log(u);
    dispatch(setChatUser(u));
  };

  return (
    <div>
      <ul className="menu p-4 w-80 lg:w-96 h-full bg-base-100 text-base-content divide-y-[1px] divide-neutral-700 ">
        <Search />
        {Object.entries(chats)?.map((chat) => (
          <li key={chat[0]} onClick={() => handleSelect(chat[1].userInfo)}>
            <div className="flex mt-2 border-[1px] border-zinc-700">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-12 rounded-full">
                  <img src={chat[1].userInfo.photoURL} />
                </div>
              </label>
              <div className="flex flex-col justify-center">
                <p className="font-bold">{chat[1].userInfo.displayName}</p>
                <span className="text-sm">
                  {chat[1].userInfo.lastMessage?.text}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
