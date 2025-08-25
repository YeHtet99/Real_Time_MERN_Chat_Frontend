import React from "react";
import useConversation from "../../statemanage/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";
import { CiMenuFries } from "react-icons/ci";
import userProfile from "./../../images/user.jpg";
import { FaLongArrowAltLeft } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";


function Chatuser(user) {
  const { selectedConversation,setSelectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();
  const navigate = useNavigate()

  const getOnlineUsersStatus = (userId) => {
    return onlineUsers.includes(userId) ? "Online" : "Offline";
  };
  const isOnline = onlineUsers.includes(user._id);

  return (
    <div className="px-6 py-3 flex items-center justify-between bg-gray-700 hover:bg-gray-600 duration-300">
      {/* Left side - Avatar & Info */}
      <div className="flex items-center space-x-4">
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-14 rounded-full">
            <img src={userProfile} alt="User" />
          </div>
        </div>
        <div>
          <h1 className="text-xl">{selectedConversation.fullname}</h1>
          {/* <span className="text-sm">
            {getOnlineUsersStatus(selectedConversation._id)}
          </span> */}
        </div>
      </div>

      {/* Right side - Button */}
      <button onClick={()=>setSelectedConversation(null)} className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center" style={{gap:'5px'}}>
        <FaLongArrowAltLeft className="text-xl" />
        <p className="mb-0">Back</p>
      </button>
    </div>
  );
}

export default Chatuser;
