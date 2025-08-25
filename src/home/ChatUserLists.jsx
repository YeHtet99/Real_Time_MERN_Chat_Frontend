import useConversation from "../statemanage/useConversation.js";
import useGetAllUsers from "../context/useGetAllUsers.jsx";
import userProfile from './../images/user.jpg'
import { useNavigate } from "react-router-dom";

function ChatUserLists(user) {

  const [allUsers, loading] = useGetAllUsers();
  const { selectedConversation, setSelectedConversation } = useConversation();
  const navigate = useNavigate()


  return (
      <div className="w-full bg-slate-900" style={{height:'calc(100% - 64px)',overflowY:'auto'}}>
        <div className="w-full pl-6 pt-6">
          <h1 className="text-l font-bold text-white">User Lists</h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full max-w-5xl p-6">
          {allUsers.map((user) => (
            <div
              key={user.id}
              className="bg-black text-gray-300 rounded-xl shadow-md flex flex-col items-center p-6"
            >
              <img
                src={userProfile}
                alt={user.fullname}
                className="w-24 h-24 rounded-full mb-4"
              />
              <h3 className="text-lg font-semibold">{user.fullname}</h3>
              <p className="mb-3 text-sm">{user.email}</p>
              <button onClick={()=> {
                setSelectedConversation(user)
                // navigate('/chat')
                }} className="px-12 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2">
                Chat
              </button>
            </div>
          ))}
        </div>
      </div>
  );
}

export default ChatUserLists;
