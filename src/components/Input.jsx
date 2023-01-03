import React from "react";
import { FaImage } from "react-icons/fa";
import { MdAttachFile } from "react-icons/md";

const Input = () => {
  return (
    <div className="input">
      <input type="text" placeholder="Type something..." />
      <div className="send">
        <MdAttachFile />
        <input type="file" style={{ display: "none" }} id="file" />
        <label htmlFor="file">
          <FaImage />
        </label>
        <button>Send</button>
      </div>
    </div>
  );
};

export default Input;
