import React, { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import { ChatContext } from "../context/chat/ChatContext";
import { SocketContext } from "../context/SocketContext";
import { ConversationActive } from "./ConversationActive";

export const SideBar = () => {
  const { auth } = useContext(AuthContext);
  const { chatState } = useContext(ChatContext);
  return (
    <div className="inbox_chat">
      {chatState.usuarios
        //filtramos para que muestre todos los usuarios exepto el mio
        .filter((user) => user.uid !== auth.uid)
        .map((usuario) => {
          return <ConversationActive key={usuario.uid} usuario={usuario} />;
        })}

      {/* <!-- Espacio extra para scroll --> */}
      <div className="extra_space"></div>
    </div>
  );
};
