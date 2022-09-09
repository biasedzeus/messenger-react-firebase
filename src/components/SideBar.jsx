import React from 'react';
import NavBar from './NavBar';
import SearchBar from './SearchBar';
import Chats from "./Chats"

const SideBar = ({closeDrawer}) => {
  return (
    <div className="sidebar">
        <NavBar/>
        <SearchBar/>
        <Chats closeDrawer={closeDrawer}/>
    </div>
  )
}

export default SideBar