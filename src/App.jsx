import React from "react";
import Left from "./home/Leftpart/Left";
import Right from "./home/Rightpart/Right";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { useAuth } from "./context/AuthProvider";
import { Toaster } from "react-hot-toast";
import Logout from "./home/left1/Logout";
import ChatUserLists from "./home/ChatUserLists";

import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./home/Navbar";
import BackIcon from "./home/BackIcon";
function App() {
  const [authUser, setAuthUser] = useAuth();
  console.log(authUser);
  return (
    <>
      <Routes>
        {/* <Route
          path="/"
          element={
            authUser ? (
              <div className="flex h-screen">
                <Logout />
                <Left />
                <Right />
              </div>



            ) : (
              <Navigate to={"/login"} />
            )
          }
        /> */}
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/signup"
          element={authUser ? <Navigate to="/" /> : <Signup />}
        />
        <Route
          path="/"
          element={authUser ?
            <div className="h-screen">
              <Navbar/>
              <ChatUserLists />
            </div> : <Navigate to={"/login"} />}
        />
        <Route
          path="/chat"
          element={authUser ?
            <div className="h-screen">
                <Navbar/>
                <Right/>
            </div>
             : <Navigate to={"/login"} />}
        />

        
      </Routes>
      <Toaster />
    </>
  );
}

export default App;













