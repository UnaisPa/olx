import { Button, IconButton } from "@mui/material";
import { Fingerprint } from "@mui/icons-material";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from "./Pages/Signup"
import Home from "./Pages/Home";
import LoginPage from "./Pages/Login";
import Create from "./Pages/Create";
import { useContext, useEffect } from "react";
import {AuthContext, FirebaseContext} from "./context/firebaseContext"
import {  onAuthStateChanged} from "firebase/auth";
import { auth } from "./firebase/config";
import Post from "./context/postContext";
import View from "./Pages/ViewPost";
function App() {
  const {user,setUser} = useContext(AuthContext);
  const {firebase} = useContext(FirebaseContext);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        console.log(currentUser);
    });

    return () => {
        unsubscribe();
    };
}, []);
  return (
    <div className="App">
      <Post>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/create" element={<Create/>} />
          <Route path="/view" element={<View/>}/>
        </Routes>
      </Router>
      </Post>
    </div>
  );
}

export default App;
