import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const Message = ({ message }) => {
  const time = (t) => {
    const date = new Date(t * 1000);

    const localTime = date.toLocaleTimeString();
    return localTime;
  };
  const { currentUser, currentChatUser } = useSelector((state) => ({
    currentUser: state.user,
    currentChatUser: state.chatUser,
  }));

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      ref={ref}
      className={`chat ${
        message.senderId === currentUser.uid ? "chat-end" : "chat-start"
      } `}
    >
      <time className="text-xs opacity-50 mr-1 mb-1">
        {time(message.date.seconds)}
      </time>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            src={
              message.senderId === currentUser.uid
                ? currentUser.photoURL
                : currentChatUser.photoURL
            }
            alt=""
          />
        </div>
      </div>
      <div className="chat-bubble">
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  );
};

export default Message;
