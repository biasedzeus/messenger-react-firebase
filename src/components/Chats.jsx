import React from 'react';
import avatar from '../assets/man.png'

const Chats = () => {
  return (
    <div className='chats'>
      <div className="userchat">
            <img src={avatar} alt="" />
            <div className="userChatInfo">
              <span>John</span>
              <p>Hi,man</p>
            </div>

          </div>
      <div className="userchat">
            <img src={avatar} alt="" />
            <div className="userChatInfo">
              <span>John</span>
              <p>Hi,man</p>
            </div>

          </div>
      <div className="userchat">
            <img src={avatar} alt="" />
            <div className="userChatInfo">
              <span>John</span>
              <p>Hi,man</p>
            </div>

          </div>
      <div className="userchat">
            <img src={avatar} alt="" />
            <div className="userChatInfo">
              <span>John</span>
              <p>Hi,man</p>
            </div>

          </div>
    
      </div>
  )
}

export default Chats