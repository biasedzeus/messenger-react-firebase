import { useState } from "react";
import "./App.css";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from './pages/Register'
function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      {/* <Register/>
      <Login/> */}
      <HomePage/>
    </div>
  );
}

export default App;
