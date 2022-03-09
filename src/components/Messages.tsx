import React, { useContext } from "react";

import { SendMessage } from "./SendMessage";
import { IncomingMessage } from "./IncomingMessage";
import { OutgoingMessage } from "./OutgoingMessage";

import { ChatContext } from "../context/chat/ChatContext";
import { AuthContext } from "../auth/AuthContext";

export const Messages = () => {
  const { chatState } = useContext(ChatContext);
  const { auth } = useContext(AuthContext);
  return (
    <div className="mesgs">
      {/* <!-- Historia inicio --> */}
      <div className="msg_history" id="messages">
        {chatState.messages.map((msg) =>
          msg.to === auth.uid ? (
            <IncomingMessage key={msg._id} message={msg} />
          ) : (
            <OutgoingMessage key={msg._id} message={msg} />
          )
        )}
      </div>
      {/* <!-- Historia Fin --> */}
      <SendMessage />
    </div>
  );
};
