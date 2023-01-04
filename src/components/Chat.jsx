import React, { useContext } from "react";
import { FaVideo } from "react-icons/fa";
import { FiMoreVertical } from "react-icons/fi";
import { ChatContext } from "../context/ChatContext";
import Input from "./Input";
import Messages from "./Messages";

const Chat = () => {
  const { data } = useContext(ChatContext);

  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
        <div className="chatIcons">
          <FaVideo />
          <FiMoreVertical />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
