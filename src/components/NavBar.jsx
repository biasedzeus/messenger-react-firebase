import React from "react";
import avatar from "../assets/man.png";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import toast from 'react-hot-toast'

const NavBar = () => {
  return (
    <nav className="navbar">
      <span className="logo"> NavBar</span>
      <div className="user">
        <img src={avatar} alt="" />
        <span>John</span>
        <button
          onClick={() => {
            const logOutToast = toast.loading("Logging Out",{
              duration:4000,
              position: "bottom-center",
            })
            signOut(auth);
            toast.success("Logged Out SuccessFully",{
              id:logOutToast
            })
          }}
        >
          Log Out
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
