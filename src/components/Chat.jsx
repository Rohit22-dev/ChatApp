import { useSelector } from "react-redux";
import { FaVideo } from "react-icons/fa";
import { IoMdCall } from "react-icons/io";
import { SlOptions } from "react-icons/sl";
import Input from "./Input";
import Messages from "./Messages";
import { useEffect } from "react";

const Chat = () => {
  const user = useSelector((state) => state.chatUser);
  useEffect(() => {
    console.log(user);
  });
  return (
    <div className="flex flex-col justify-between flex-1">
      {/* Top */}
      <div className="flex p-4 px-4 justify-between items-center h-fit w-full ">
        <p className="font-semibold tracking-wider">{user?.displayName}</p>
        <div className="flex gap-4">
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
