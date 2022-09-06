import React from "react";
import {HiOutlineUpload} from 'react-icons/hi'

const Login = () => {
  return (
    <div className="form-container">
      <div className="form-wrapper">
        <span className="logo">Messenger</span>
        <span className="title">Log In</span>

        <form>
         <input type="email" name="email" id="email" placeholder="abc@example.com" />
         <input type="password" placeholder="password"/>
        
         <button>Log In</button>
        </form>
        <p>Don't have an account yet? <a href="/">register here</a></p>
      </div>
      
    </div>);
};

export default Login;
