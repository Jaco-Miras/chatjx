import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import React, { useContext, useState } from "react";
import { FaImage } from "react-icons/fa";
import { MdAttachFile } from "react-icons/md";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  // const [imageUrl, setImageUrl] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async (e) => {
    e.preventDefault();

    if (img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          //TODO:Handle Error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
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
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
        img,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
        img,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    // setImg(null);
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    if (!file) {
      setImg("");
      return;
    }

    reader.onloadend = () => {
      setImg(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <form onSubmit={handleSend}>
      <div className="input">
        {img ? <img src={img} alt="Preview" /> : null}
        <input
          type="text"
          placeholder="Type something..."
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
        <div className="send">
          {/* <MdAttachFile /> */}
          <input
            type="file"
            style={{ display: "none" }}
            id="file"
            accept="image/*"
            onChange={(e) => setImg(e.target.files[0])}
          />
          <label htmlFor="file">
            <FaImage />
          </label>
          <button disabled={!text}>Send</button>
        </div>
      </div>
    </form>
  );
};

export default Input;
