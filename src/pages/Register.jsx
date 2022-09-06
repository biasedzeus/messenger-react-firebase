import React from "react";
import {HiOutlineUpload} from 'react-icons/hi'

const Register = () => {
  return (
    <div className="form-container">
      <div className="form-wrapper">
        <span className="logo">Messenger</span>
        <span className="title">Register</span>

        <form>
         <input type="text" placeholder="enter name"/>
         <input type="email" name="email" id="email" placeholder="abc@example.com" />
         <input type="password" placeholder="password"/>
         <input style={{display:'none'}} type='file' id="fileupload"/>
         <label htmlFor="fileupload">
          <HiOutlineUpload/>
          <span>Add an avatar</span>
         </label>
         <button>Sign Up</button>
        </form>
        <p>Already Have an account? <a href="/">Login here</a></p>
      </div>
      
    </div>);
};

export default Register;
