import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import React, { useContext, useState } from "react";
import { BiImageAdd } from "react-icons/bi";
import { MdAttachFile } from "react-icons/md";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";

const MsgInput = () => {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSendMsg = async () => {
    if (image) {
      console.log(image);
      const storageRef = ref(storage, image.name);

      const uploadTask = uploadBytesResumable(storageRef, image);

      const toastId = toast.loading("Please wait", {
        duration: 4000,
        position: "bottom-center",
      });
      uploadTask.on(
        (error) => {
          //TODO:Handle Error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuidv4(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );

     
      setText("");
      setImage(null);
    } else {
      if (text === "") return;
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuidv4(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [data.chatId + ".lastMessage"]: {
          text,
        },
        [data.chatId + ".date"]: serverTimestamp(),
      });
      await updateDoc(doc(db, "userChats", data.user.uid), {
        [data.chatId + ".lastMessage"]: {
          text,
        },
        [data.chatId + ".date"]: serverTimestamp(),
      });
      setText("");
    }
  };

  const handleKeyDown = (e) =>{
        if(e.code === 'Enter'){
          console.log("enter pressed")
          handleSendMsg();
        }
          
  }




  return (
    <div className="msgInput">
      <input
        type="text"
        placeholder="type message...."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) =>handleKeyDown(e)} 
      />

      <div className="send">
        <input
          style={{ display: "none" }}
          type="file"
          id="msg-file-upload"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <MdAttachFile className="attachFile" color="gray" />
        <label htmlFor="msg-file-upload">
          <BiImageAdd color="gray" />
        </label>
        <button onClick={handleSendMsg}>Send</button>
      </div>
    </div>
  );
};

export default MsgInput;
