import React, { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";

export const SearhBox = () => {
  const { logout, auth } = useContext(AuthContext);
  const { name, image } = auth;
  return (
    <div className="headind_srch">
      {/* <div className="recent_heading mt-2"> */}
      <div
        style={{
          flexDirection: "row",
          alignItems: "center",
          display: "flex",
          // backgroundColor: "red",
        }}
      >
        <img
          src={
            image
              ? image
              : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
          }
          style={{ width: 50, height: 50, borderRadius: 100, marginRight: 10 }}
          alt="load"
        />
        <h4>{name}</h4>
      </div>
      <button className="btn text-danger" onClick={logout}>
        Salir
      </button>
    </div>
  );
};
