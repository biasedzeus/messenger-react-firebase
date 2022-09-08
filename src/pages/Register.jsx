import React, { useState } from "react";

// REACT_ICONS
import { HiOutlineUpload } from "react-icons/hi";

// FIREBASE
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

// REACT HOT TOAST
import toast, { Toaster } from "react-hot-toast";

// REACT ROUTER DOM
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const navigate = useNavigate();

  const handleChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const storageRef = ref(storage, name);

      const uploadTask = uploadBytesResumable(storageRef, selectedFile);
      const toastId = toast.loading("registering", {
        duration: 4000,
        position: "bottom-center",
      });
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
          console.log(error);
          setError(error);
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            console.log("File available at", downloadURL);
            await updateProfile(response.user, {
              displayName: name,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "users", response.user.uid), {
              uid: response.user.uid,
              displayName: name,
              email,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "userChats", response.user.uid), {});
            toast.success("Registered & loggedIn Successfully.", { id: toastId });
          });
          navigate("/");
          // toast.dismiss();
        }
      );
    } catch (error) {
      console.log("erro2", error);
      setError(error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <span className="logo">Messenger</span>
        <span className="title">Register</span>

        <form>
          <input
            type="text"
            placeholder="enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            name="email"
            id="email"
            placeholder="abc@example.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            style={{ display: "none" }}
            type="file"
            id="fileupload"
            onChange={handleChange}
          />
          <label htmlFor="fileupload">
            <HiOutlineUpload />
            <span>Add an avatar</span>
          </label>
          <button type="submit" onClick={handleSubmit}>
            Sign Up
          </button>
          {error && <span>{error.message}</span>}
        </form>
        <p>
          Already Have an account? <a href="/">Login here</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
