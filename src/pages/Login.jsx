import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import { auth } from "../firebase";
import toast from 'react-hot-toast';



const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginToast = toast.loading('Please Wait',{
      duration:4000,
      position: "bottom-center",
    })
    try {
      await signInWithEmailAndPassword(auth,email,password);
      toast.success('logged In',{
        id:loginToast
      })
      navigate("/")    

    } catch (error) {
      console.log("erro2", error);
      setError(error.message);
      toast.error(error.message);
    }
  };

  return (
    <div style={{ backgroundColor: "gray" }} className="form-container">
      <div className="form-wrapper">
        <span className="logo">Messenger</span>
        <span className="title">Log In</span>

        <form>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="abc@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input 
            type="password" 
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />

          <button onClick={handleSubmit}>Log In</button>
        </form>
        <p>
          Don't have an account yet? <Link to="/register">register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
