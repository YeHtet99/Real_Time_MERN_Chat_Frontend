import React from "react";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { useAuth } from "./context/AuthProvider";
import { Toaster } from "react-hot-toast";
import ChatContainer from "./home/ChatContainer";

import { Navigate, Route, Routes } from "react-router-dom";
function App() {
  const [authUser, setAuthUser] = useAuth();
  console.log(authUser);
  return (
    <>
      <Routes>
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
            <ChatContainer/>
             : <Navigate to={"/login"} />}
        />

        
      </Routes>
      <Toaster />
    </>
  );
}

export default App;













