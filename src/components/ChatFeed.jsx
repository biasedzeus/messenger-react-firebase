import React, { useContext } from "react";
import { AiFillVideoCamera } from "react-icons/ai";
import { FaUserPlus } from "react-icons/fa";
import { FiMoreHorizontal } from "react-icons/fi";
import { ChatContext } from "../context/ChatContext";
import Messages from "./Messages";
import MsgInput from './MsgInput'
import {TiThMenu} from "react-icons/ti";

const ChatFeed = ({handleMenuToggle}) => {
  

  const {data} = useContext(ChatContext);
  console.log("data",data)
  return (
    <div className="chatfeed">

      <div className="chatInfo">
        <button className="xs-menu-sidebar-btn"
        onClick={handleMenuToggle}
        ><TiThMenu/></button>

        <span>{data.user?.displayName}</span>

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
