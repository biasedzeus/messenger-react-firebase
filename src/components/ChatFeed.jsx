import React from "react";
import { AiFillVideoCamera } from "react-icons/ai";
import { FaUserPlus } from "react-icons/fa";
import { FiMoreHorizontal } from "react-icons/fi";
import Messages from "./Messages";
import MsgInput from './MsgInput'

const ChatFeed = () => {
  return (
    <div style={
      
      {position:'relative'}
    } className="chatfeed">
      <div className="chatInfo">
        <span>John</span>
        <div className="chat-icons">
          
        <AiFillVideoCamera />
        <FaUserPlus />
        <FiMoreHorizontal />
        </div>
      </div>
      <Messages/>
      <MsgInput/>
    </div>
  );
};

export default ChatFeed;
