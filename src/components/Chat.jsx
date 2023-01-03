import React from "react";
import { FaVideo } from "react-icons/fa";
import { FiMoreVertical } from "react-icons/fi";
import Input from "./Input";
import Messages from "./Messages";

const Chat = () => {
  return (
    <div className="chat">
      <div className="chatInfo">
        <span>Aloha</span>
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
