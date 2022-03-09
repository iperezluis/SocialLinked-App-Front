import React, { createContext, useReducer, useState, useCallback } from "react";
import { apiChat } from "../../api/ApiChat";
import { ImageResponse, Message, Usuario } from "../../interfaces/models";
import { ChatReducer } from "./ChatReducer";

export interface InitialStateChat {
  uid: string | undefined;
  chatActivo: string | null;
  usuarios: Usuario[];
  messages: Message[];
  images?: string;
}
const initialState: InitialStateChat = {
  uid: "",
  chatActivo: null,
  usuarios: [],
  messages: [],
  images: "",
};
export type ChatContextProps = {
  chatState: InitialStateChat;
  loadUsers: (users: Usuario[]) => void;
  activeChat: (id: string) => void;
  newMessage: (message: Message) => void;
  loadMessages: (message: Message[]) => void;
  // uploadImage: (data: FormData) => Promise<void>;
  cleanMessages: (state: InitialStateChat) => void;
};
export const ChatContext = createContext({} as ChatContextProps);

export const ChatProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  // const [state, setState] = useState<InitialState>(initialState);
  const [chatState, dispatch] = useReducer(ChatReducer, initialState);
  const loadUsers = (users: Usuario[]) => {
    dispatch({ type: "usuarios cargados", payload: users });
    console.log("accion disparada");
  };
  // show chat when you give click in each screen
  const activeChat = (id: string) => {
    dispatch({ type: "activar chat", payload: id });
  };
  //usando useCallback me ahorre un poco de problemas
  const newMessage = useCallback((message: Message) => {
    dispatch({ type: "nuevo mensaje", payload: message });
  }, []);
  //load messages when you are into chat
  const loadMessages = useCallback((message: Message[]) => {
    dispatch({ type: "cargar mensajes", payload: message });
  }, []);
  //clean messages after log out chat
  const cleanMessages = (state: InitialStateChat) => {
    dispatch({ type: "limpiar chat", payload: state });
  };

  return (
    <ChatContext.Provider
      value={{
        chatState,
        loadUsers,
        activeChat,
        newMessage,
        loadMessages,
        cleanMessages,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
