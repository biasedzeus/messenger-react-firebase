import React from 'react';
import avatar from '../assets/man.png'
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';


const NavBar = () => {
  return (
    <nav className='navbar'>
       <span className='logo'> NavBar</span>
       <div className="user">
        <img src={avatar}  alt="" />
        <span>John</span>
        <button onClick={() => signOut(auth)}>Log Out</button>
       </div>
        
        </nav>
  )
}

export default NavBar