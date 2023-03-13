import { MdOutlineAttachFile } from "react-icons/md";
import { BsImageFill } from "react-icons/bs";
import { useState } from "react";
import { useSelector } from "react-redux";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../config";
import { v4 as uuid } from "uuid";

const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const { currentUser, chatUser, chatId } = useSelector((state) => ({
    currentUser: state.user,
    chatUser: state.chatUser,
    chatId: state.chatId,
  }));

  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          //TODO:Handle Error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [chatId + ".lastMessage"]: {
        text,
      },
      [chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", chatUser.uid), {
      [chatId + ".lastMessage"]: {
        text,
      },
      [chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
  };

  const handleKey = (e) => {
    if (e.key === "Enter") {
      handleSend();
      setText("");
    }
  };

  return (
    <div className="p-2 bg-neutral-200 flex justify-between">
      <input
        type="text"
        placeholder="Type something..."
        onChange={(e) => setText(e.target.value)}
        value={text}
        className="w-full outline-none text-black break-words placeholder:text-zinc-600"
        onKeyDown={handleKey}
      />
      <div className="flex items-center gap-2">
        <MdOutlineAttachFile size={24} className="text-zinc-600" />
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e) => setImg(e.target.files[0])}
        />

        <label htmlFor="file">
          <BsImageFill size={24} color="gray" className="cursor-pointer" />
        </label>
        <button onClick={handleSend} className="btn btn-sm">
          Send
        </button>
      </div>
    </div>
  );
};

export default Input;
