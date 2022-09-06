import React from 'react'
import {BiImageAdd} from 'react-icons/bi'
import {MdAttachFile} from 'react-icons/md'
const MsgInput = () => {
  return (
    <div className='msgInput'>
    <input type='text' placeholder='type message....' />



    <div className="send">
    <input style={{display:'none'}} type='file' id='msg-file-upload' />
    <MdAttachFile className='attachFile' color='gray'/>
    <label htmlFor='msg-file-upload'>
      <BiImageAdd color='gray'/>
    </label>
    <button>Send</button>
    </div>
    </div>
  )
}

export default MsgInput;