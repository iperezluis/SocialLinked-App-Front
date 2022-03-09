import React, { useContext } from "react";

import { InitialStateChat } from "../../context/chat/ChatContext";
import { Message, Usuario } from "../../interfaces/models";

export type ActionReducer =
  | { type: "usuarios cargados"; payload: Usuario[] }
  | { type: "activar chat"; payload: string }
  | { type: "nuevo mensaje"; payload: Message }
  | { type: "cargar mensajes"; payload: Message[] }
  // | { type: "subir imagen"; payload: string }
  | { type: "limpiar chat"; payload: InitialStateChat };

export const ChatReducer = (
  state: InitialStateChat,
  action: ActionReducer
): InitialStateChat => {
  switch (action.type) {
    case "usuarios cargados":
      return {
        ...state,
        usuarios: [...action.payload],
      };
    case "activar chat":
      //ejecutamos este condicioanl para evitar purgar los messages
      if (state.chatActivo === action.payload) return state;
      return {
        ...state,
        chatActivo: action.payload,
        messages: [],
      };
    case "nuevo mensaje":
      //si el screen de la persona que seleccione me envia un nuevo mensaje retornamos todos sus mensajes y su nuevoi mensaje
      if (
        state.chatActivo === action.payload.from ||
        state.chatActivo === action.payload.to
      ) {
        return {
          ...state,
          messages: [...state.messages, action.payload],
        };
      } else {
        return state;
      }
    case "cargar mensajes":
      return {
        ...state,
        messages: [...action.payload],
      };
    case "limpiar chat":
      return {
        ...state,
        chatActivo: null,
        messages: [],
        uid: "",
        usuarios: [],
      };
    // case "subir imagen":
    //   return {
    //     ...state,
    //   };
    default:
      return state;
  }
};
