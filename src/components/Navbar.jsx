import React, { useContext } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-hot-toast";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logged Out Successfully!!!");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <div className="navbar">
      <span className="logo">ChatJX</span>
      <div className="user">
        <img src={currentUser.photoURL} alt="" />
        <span>{currentUser.displayName}</span>
        <button onClick={handleLogout}>logout</button>
      </div>
    </div>
  );
};

export default Navbar;
