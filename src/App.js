import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import SignUp from "./components/SignUp";
import Login from "./components/Login";

import Notes from "./components/Notes";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
  const [alert, setAlert] = useState({type : "", message: ""});
  const showAlert = (type, message) =>{
    setAlert({
      type : type,
      message : message,
    })
    setTimeout(() =>{
      setAlert(null);
    }, 1500);
  }
  return (

    <div>
      <NoteState>
        <Router>
          <Navbar />
          <Alert className="mx-10" alert={alert}/>
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/home" element={<Home showAlert={showAlert} />} />
              <Route exact path="/notes" element={<Notes showAlert={showAlert} />} />
              <Route exact path="/about" element={<About/>} />
              <Route exact path="/login" element={<Login showAlert={showAlert}/>} />
              <Route exact path="/signup" element={<SignUp showAlert={showAlert}/>} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </div>
  );
}

export default App;
