import React, { createContext, useContext, useEffect, useState } from "react";

import { Socket } from "socket.io-client";
import { AuthContext } from "../auth/AuthContext";
import { ScrollToBottomAnimation } from "../helpers/scrollToBottom";
import { useSocket } from "../hooks/useSocket";
import { Usuario } from "../interfaces/models";
import { ChatContext } from "./chat/ChatContext";

type socketProvider = {
  onLine: boolean;
  usuarios: Usuario[];
  socket: Socket | undefined;
};

export const SocketContext = createContext({} as socketProvider);
export const SocketProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const { auth } = useContext(AuthContext);
  const { loadUsers, newMessage } = useContext(ChatContext);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const { onLine, socket, connectSocket, disconnectSocket } = useSocket(
    "http://localhost:3500"
  );
  //--> este es el localhost del servidor(backEnd)
  //FALTA POR HACER EL POST DE IMAGENES AL CHAT #FFF
// cleanChat function suing useCallback
  useEffect(() => {
    if (auth.logged) {
      return connectSocket();
    }
  }, [auth, connectSocket]);

  useEffect(() => {
    if (!auth.logged) {
      return disconnectSocket();
    }
  }, [auth, disconnectSocket]);

  useEffect(() => {
    socket?.on("lista-usuarios", (users) => {
      loadUsers(users);
      // console.log(users);
    });
  }, [socket, loadUsers]);

  useEffect(() => {
    socket?.on("enviar-mensaje", (message) => {
      newMessage(message);
      ScrollToBottomAnimation("messages");
      // console.log(message);
    });
  }, [socket, newMessage]);

  return (
    <SocketContext.Provider value={{ onLine, socket, usuarios }}>
      {children}
    </SocketContext.Provider>
  );
};
