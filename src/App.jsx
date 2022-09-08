import { useContext, useState } from "react";
import "./App.css";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import ProtectedRoute from "./utils/ProtectedRoute";

function App() {
  const { currentUser } = useContext(AuthContext);
  console.log("App", currentUser);

  return (
    <div>
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <ProtectedRoute user={currentUser}>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<div>ERROR 404</div>} />
        </Route>
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
