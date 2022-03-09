import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import { ChatApp } from "./ChatApp";
import { AuthProvider } from "./auth/AuthContext";
import { SocketProvider } from "./context/SocketContext";
import { ChatProvider } from "./context/chat/ChatContext";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ChatProvider>
        <AuthProvider>
          <SocketProvider>
            <ChatApp />
          </SocketProvider>
        </AuthProvider>
      </ChatProvider>
    </BrowserRouter>
  </React.StrictMode>,

  document.getElementById("root")
);
