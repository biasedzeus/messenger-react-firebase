import React from 'react';
import avatar from '../assets/man.png'

const SearchBar = () => {
  return (
         <div className="searchbar">
          <div className="searchbar-form">
            <form>
              <input type="text" placeholder="search friends..."/>
            </form>
          </div>
          <div className="userchat">
            <img src={avatar} alt="" />
            <div className="userChatInfo">
              <span>John</span>
            </div>

          </div>
          
         </div>
    )
}

export default SearchBar