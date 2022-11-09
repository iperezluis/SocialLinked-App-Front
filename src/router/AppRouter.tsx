import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";

import { ChatPage } from "../pages/ChatPage";
import { Loading } from "../components/Loading";
import { AuthRoutes } from "../auth/routes/AuthRoutes";

export const AppRouter = () => {
  const { auth } = useContext(AuthContext);
  // const Navigate = useNavigate();

  if (auth.checking) {
    return <Loading />;
  }

  return (
    <Routes>
      {auth.logged ? (
        <Route path="/*" element={<ChatPage />} />
      ) : (
        <>
          <Route path="/auth/*" element={<AuthRoutes />} />

          <Route path="/*" element={<Navigate to="/auth/login" />} />
        </>
      )}
    </Routes>
  );
};
