import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { db } from "../config";
import Message from "./Message";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const chatId = useSelector((state) => state.chatId);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [chatId]);

  // console.log(messages);

  return (
    <div className="h-[47rem] p-10 bg-neutral overflow-scroll">
      {messages.map((m) => (
        <Message message={m} key={m.id} />
      ))}
    </div>
  );
};

export default Messages;
