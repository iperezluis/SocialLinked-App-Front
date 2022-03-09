import React, { useContext, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { AuthContext, InitialState } from "../auth/AuthContext";

import { ChatPage } from "../pages/ChatPage";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import { Loading } from "../components/Loading";

export const AppRouter = () => {
  const { auth } = useContext(AuthContext);
  const Navigate = useNavigate();

  if (auth.checking) {
    return <Loading />;
  }
  console.log("esta loggeado: ");
  console.log(auth.logged);
  return (
    <Routes>
      <Route path="/messages" element={<ChatPage />} />
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/auth/register" element={<RegisterPage />} />
    </Routes>
  );
};
