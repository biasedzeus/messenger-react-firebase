import React from 'react';
import avatar from '../assets/man.png'

const Message = () => {
  return (
    <div className='message owner'>
      <div className="messageInfo">
        <img src={avatar} alt="" />
        <span>3 sec ago</span>
      </div>
      <div className="messageContent">
        <p>hi how have you been</p>
        <img src={avatar} alt="" />

      </div>
    </div>
  )
}

export default Message