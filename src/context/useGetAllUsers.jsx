import { useEffect, useState } from "react";
import io from "socket.io-client";
import { Cookies } from "react-cookie";
import { url } from "../../url";

function useGetAllUsers() {
  const [allUsers, setAllUsers] = useState([]);
  const cookies = new Cookies();
  const userId = cookies.get("userId");

  useEffect(() => {
    const socket = io(url, {
      query: { userId },
      reconnection: true, // Enable reconnection
        reconnectionAttempts: Infinity,
        reconnectionDelay: 5000, // Wait 2s before retrying
        reconnectionDelayMax: 5000,
    });

    // Listen for updated user list
    socket.on("getAllUsers", (users) => {
      setAllUsers(users);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return [allUsers];
}

export default useGetAllUsers;
