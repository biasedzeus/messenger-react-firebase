import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import avatar from "../assets/man.png";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";

const Chats = ({ closeDrawer }) => {
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (user) => {
    dispatch({ type: "CHANGE_USER", payload: user });
    closeDrawer && closeDrawer();
    // console.log(user);
  };

  return (
    <div className="chats">
      {chats &&
        Object.entries(chats)
          ?.sort((a, b) => b[1].date - a[1].date)
          .map((chat) => (
            <div
              className="userchat"
              key={chat[0]}
              onClick={() => handleSelect(chat[1].userInfo)}
            >
              <img
                className="userchatImage"
                src={chat[1].userInfo.photoURL}
                alt=""
              />
              <div className="userChatInfo">
                <span>{chat[1].userInfo.displayName}</span>
                <p>{chat[1].lastMessage ? chat[1].lastMessage?.text : ""}</p>
              </div>
            </div>
          ))}
    </div>
  );
};

export default Chats;
