import React, { useContext } from "react";
import "../css/chat.css";
import { InboxPeople } from "../components/InboxPeople";
import { SelectChat } from "../components/SelectChat";
import { ChatContext } from "../context/chat/ChatContext";
import { Messages } from "../components/Messages";

export const ChatPage = () => {
  const { chatState } = useContext(ChatContext);
  return (
    <div className="inbox_msg">
      <div className="messaging">
        <InboxPeople />
        {/* este select chat es si el usuario n oha seleccioando ningun chat entonces muestra un icono */}
        {chatState.chatActivo ? <Messages /> : <SelectChat />}
      </div>
    </div>
  );
};
