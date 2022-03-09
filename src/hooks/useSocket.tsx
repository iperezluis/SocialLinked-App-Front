import React, { useEffect, useState, useCallback } from "react";
import io, { Socket } from "socket.io-client";

export const useSocket = (url: string) => {
  const [onLine, setOnLine] = useState<boolean>(false);
  const [socket, setSocket] = useState<Socket>();

  const connectSocket = useCallback(() => {
    //extraemos el token para mandarlo como parametro a nuestro backend
    const token = localStorage.getItem("token");
    const socketTemp = io(url, {
      autoConnect: true,
      forceNew: true,
      query: {
        "x-token": token,
      },
    }).connect();
    setSocket(socketTemp);
  }, [url]);

  const disconnectSocket = useCallback(() => {
    io(url).disconnect();
  }, [url]);

  useEffect(() => {
    socket?.on("connect", () => setOnLine(true));
    console.log("cliente conectado");
  }, [socket]);

  useEffect(() => {
    socket?.on("disconnect", () => setOnLine(false));
    console.log("cliente desconectado");
  }, [socket]);

  return {
    socket,
    onLine,
    connectSocket,
    disconnectSocket,
  };
};
