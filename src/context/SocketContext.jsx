import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";
import io from "socket.io-client";
import { url } from "../../url";
const socketContext = createContext();


// it is a hook.
export const useSocketContext = () => {
  return useContext(socketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [authUser] = useAuth();

  useEffect(() => {
    if (authUser) {
      const socket = io(`${url}`, {
        query: {
          userId: authUser.user._id,
        },
        reconnection: true, // Enable reconnection
        reconnectionAttempts: Infinity,
        reconnectionDelay: 5000, // Wait 2s before retrying
        reconnectionDelayMax: 5000, // Max delay before retrying
      });
      setSocket(socket);

      // Emit a custom event when reconnecting
      socket.on("reconnect_attempt", () => {
        console.log("Attempting to reconnect...");
        socket.emit("reconnecting", { userId: authUser.user._id }); // Custom event
      });

      // Listen for "getOnlineUsers" event to update online users
      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      // socket.on("ping", () => {
      //   console.log("Ping received from server");
      //   socket.emit("pong");  // Respond to the ping with a pong
      // });

      // Handle successful reconnection
      socket.on("reconnect", (attempt) => {
        console.log(`Reconnected after ${attempt} attempt(s)`);
        socket.emit("reconnected", { userId: authUser.user._id }); // Custom event for successful reconnection
      });

      // Handle reconnection failure after max attempts
      socket.on("reconnect_failed", () => {
        console.log("Failed to reconnect after max attempts");
        socket.emit("reconnection_failed", { userId: authUser.user._id }); // Custom event for failure
      });

      // Listen for disconnect event
      socket.on("disconnect", (reason) => {
        console.log("Disconnected from the server due to:", reason);
      });

      // Cleanup on disconnection or unmount
      return () => {
        socket.close();
        setSocket(null);
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);
  return (
    <socketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </socketContext.Provider>
  );
};
