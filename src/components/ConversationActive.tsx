import React, { useContext } from "react";
import { apiChat } from "../api/ApiChat";
import { AuthContext } from "../auth/AuthContext";
import { ChatContext } from "../context/chat/ChatContext";
import { ScrollToBottom } from "../helpers/scrollToBottom";
// import { SocketContext } from "../context/SocketContext";
import { MessagesResponse, Usuario } from "../interfaces/models";

interface Props {
  usuario: Usuario;
}
export const ConversationActive = ({ usuario }: Props) => {
  const { auth } = useContext(AuthContext);
  const { chatState, activeChat, loadMessages } = useContext(ChatContext);
  //activamos la ventana del chat que el usuario haga click
  //recuerda que usuario.uid es el id del usuario que estamos extrayendo de la base de datos
  const onClick = async () => {
    activeChat(usuario.uid);
    //cargamos los mensajes desde la database
    const res = await apiChat.get<MessagesResponse>(`/messages/${usuario.uid}`);
    const { msg } = res.data;
    await loadMessages(msg);
    ScrollToBottom("messages");
    console.log(res.data.msg);
  };
  // const { usuarios } = useContext(SocketContext);
  // const { name, logged } = auth;
  //add post for upload image
  return (
    <div className="chat_list" onClick={onClick}>
      <div className="chat_people">
        <div className="chat_img">
          <img
            style={{ borderRadius: 100 }}
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
            alt="profile"
          />
        </div>
        <div className="chat_ib">
          <h5>{usuario.nombre}</h5>
          {usuario.online ? (
            <span className="text-success">Online</span>
          ) : (
            <span className="text-danger">Offline</span>
          )}
        </div>
      </div>
    </div>
  );
};
