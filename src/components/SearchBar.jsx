import React,{useContext, useState} from 'react';
import avatar from '../assets/man.png';
import {db} from '../firebase'
import { collection, getDoc, query, serverTimestamp, setDoc, updateDoc, where,doc } from 'firebase/firestore'
import {AuthContext} from "../context/AuthContext"

const SearchBar = () => {
  
  const [userName,setUserName] = useState(null);
  const [searchedUser, setSearchedUser] = useState("");
  const [error, setError] = useState("");

  const {currentUser} = useContext(AuthContext);



  const usersRef = collection(db, "users")  
  
  const getSearchedUser = async() =>{
    
    const q = query(usersRef, where("displayName", "==" , userName))
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) =>{
        setSearchedUser(doc.data())
        console.log(doc.id, "==>", doc.data())
      })
      
    } catch (error) {
      console.log(error)
      setError(error);
      
    }
    
  }

  const handleKeyDown = (e) => {
        e.code === "Enter" && getSearchedUser();
  }
  const handleSelect  = async() =>{

    // check whether chat exists in firestore, if not create
    const combinedId  = currentUser.uid > searchedUser.uid 
    ? currentUser.uid + searchedUser.uid 
    : searchedUser?.uid + currentUser?.uid ;
    try {
      const response = await getDoc(doc(db,"chats",combinedId));

      if(!response.exists()){
        await setDoc(doc(db,"chats",combinedId),{messages:[]})
      }
      
      // create user chats
      await updateDoc(doc(db,"userChats",currentUser.uid),{
        [combinedId+".userInfo"]:{
          uid:searchedUser.uid,
          displayName:searchedUser.displayName,
          photoURL:searchedUser.photoURL,

        },
        [combinedId+".date"]:serverTimestamp(),
      })
    
      await updateDoc(doc(db,"userChats",searchedUser.uid),{
        [combinedId+".userInfo"]:{
          uid:currentUser.uid,
          displayName:currentUser.displayName,
          photoURL:currentUser.photoURL,

        },
        [combinedId+".date"]:serverTimestamp(),
      })
    }
     catch (error) {
      console.log(error);
    }
   setSearchedUser(null);
   setUserName("");


  }

  return (
    <div className="searchbar">
      <div className="searchbar-form">
        <input
          type="text"
          placeholder="search friends..."
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
      {error && "something went wrong"}
      {searchedUser && <div className="userchat" onClick={handleSelect}>
        <img src={searchedUser?.photoURL} alt="" />
        <div className="userChatInfo">
          <span>{searchedUser?.displayName}</span>
        </div>
      </div>}
    </div>
  );
}

export default SearchBar