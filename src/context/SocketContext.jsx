import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";
import io from "socket.io-client";
import { url } from "../../url";
const socketContext = createContext();

export const useSocketContext = () => {
  return useContext(socketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [authUser] = useAuth();

  useEffect(() => {
    if (authUser) {
      const socket = io(`${url}`, {
        query: {
          userId: authUser.user._id,
        },
        reconnection: true, // Enable reconnection
        reconnectionAttempts: Infinity,
        reconnectionDelay: 5000, // Wait 5s before retrying
        reconnectionDelayMax: 5000, // Max delay before retrying
      });
      setSocket(socket);

      socket.on("ping", () => {
        socket.emit("pong");
      });
 
      // Listen for disconnect event
      socket.on("disconnect", (v) => {
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
    <socketContext.Provider value={{ socket }}>
      {children}
    </socketContext.Provider>
  );
};
