import React, { useContext } from "react";
import avatar from "../assets/man.png";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import toast from 'react-hot-toast'
import { AuthContext } from "../context/AuthContext";

const NavBar = () => {
  const {currentUser} = useContext(AuthContext);
   
  const handleComingSoon = () =>{
    toast.success("Coming Soon...")
  }

  return (
    <nav className="navbar">
      <span className="logo">Messenger</span>
      <div className="user">
        <img src={currentUser?.photoURL} alt="" onClick={handleComingSoon}/>
        <span>{currentUser?.displayName}</span>
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
