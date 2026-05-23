import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // 1. ADD THIS LOG TO VERIFY THE URL
    console.log("ATTEMPTING TO CONNECT TO:", import.meta.env.VITE_SOCKET_URL);

    const newSocket = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000', {
      withCredentials: true,
      transports: ['websocket'] 
    });
    
    // ... rest of the code

const SocketContext = createContext();

// Custom hook so our components can easily grab the socket
export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Connect to the backend Socket.io server
    const newSocket = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000');
    
    setSocket(newSocket);

    // Cleanup: disconnect when the provider unmounts
    return () => newSocket.close();
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
