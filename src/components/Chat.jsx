import { useSelector } from "react-redux";
import { FaVideo } from "react-icons/fa";
import { IoMdCall } from "react-icons/io";
import { SlOptions } from "react-icons/sl";
import Input from "./Input";
import Messages from "./Messages";
import { useEffect } from "react";

const Chat = () => {
  const user = useSelector((state) => state.chatUser);
  
  return (
    <div className="flex flex-col justify-between flex-1">
      {/* Top */}
      <div className="flex p-4 px-4 justify-between items-center h-fit w-full bg-base-200">
        <p className="font-semibold tracking-wider text-base-content">{user?.displayName}</p>
        <div className="flex gap-4 text-base-content">
          <FaVideo />
          <IoMdCall />
          <SlOptions />
        </div>
      </div>
      {/* Middle */}
      <Messages />
      {/* Bottom */}
      <Input />
    </div>
  );
};

export default Chat;
