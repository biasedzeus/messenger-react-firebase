import React from 'react';
import avatar from '../assets/man.png'

const NavBar = () => {
  return (
    <nav className='navbar'>
       <span className='logo'> NavBar</span>
       <div className="user">
        <img src={avatar}  alt="" />
        <span>John</span>
        <button>Log Out</button>
       </div>
        
        </nav>
  )
}

export default NavBar