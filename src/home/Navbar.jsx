import { useState } from 'react';
import userProfile from './../images/user.jpg'
import { useAuth } from '../context/AuthProvider';
import { Cookies } from "react-cookie";
import toast from 'react-hot-toast';
import axios from 'axios';
import { url } from '../../url';
import { useNavigate } from 'react-router-dom';


function Navbar() {
    const [authUser] = useAuth();
    const cookies = new Cookies()
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    
    const handleLogout = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${url}/api/user/logout`);
      localStorage.removeItem("ChatApp");
      // Cookies.remove("jwt");
      cookies.remove('userId')
      setLoading(false);
      toast.success("Logged out successfully");
      window.location.reload();
    } catch (error) {
      toast.error("Error in logging out");
    }
  };

  return (
      <nav className="bg-black shadow-md px-6 py-3 flex items-center justify-between text-white">
      {/* Left side - Logo */}
      <div className="flex items-center space-x-2" style={{cursor:'pointer'}}>
        <span onClick={()=>navigate('/')} className="text-2xl font-bold">Talkii</span>
      </div>

      {/* Right side - User Info */}
      <div className="flex items-center space-x-4">
        <img
          src={userProfile}
          className="w-10 h-10 rounded-full"
        />
        <span className="font-medium">{authUser.user.fullname}</span>
        <button onClick={handleLogout} className="px-4 py-1 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2">
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;

