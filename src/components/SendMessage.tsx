import { Blob } from "buffer";
import React, { ChangeEvent, FormEvent, useContext, useState } from "react";
import { apiChat } from "../api/ApiChat";

import { AuthContext } from "../auth/AuthContext";
import { ChatContext } from "../context/chat/ChatContext";
import { SocketContext } from "../context/SocketContext";
import { useSocket } from "../hooks/useSocket";
import { ImageResponse } from "../interfaces/models";

export const SendMessage = () => {
  const [message, setMessage] = useState<string>("");
  const { auth } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);
  const { chatState } = useContext(ChatContext);
  const [image, setImage] = useState<string>();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(message);
    if (message.length === 0) {
      return;
    }
    setMessage("");
    setImage("");
    socket?.emit("enviar-mensaje", {
      from: auth.uid,
      to: chatState.chatActivo, //el chatActivo contiene el uid del usuario cuando clickeaste el screen
      message: message,
    });
  };
  const loadImage = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      setImage(URL.createObjectURL(e.target.files![0]));
      const file = e.target.files![0];
      const formData = new FormData();
      formData.append("archivo", file);

      const res = await apiChat.post<ImageResponse>("/imageuser", formData);

      console.log(e.target.files![0]);
      console.log(res.data);
      const mensaje = document.querySelector("#messages");
      mensaje!.innerHTML += `<img
            src=${e.target.files![0]} 
            style={{ width: 25, height: 25, marginLeft: 10 }}
            alt="load"
          />`;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      action=" "
      onSubmit={(e) => onSubmit(e)}
      encType="multipart/form-data"
    >
      {/* <div className="type_msg row"> */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          // backgroundColor: "red",
        }}
      >
        <div className="" style={{ marginRight: 10 }}>
          <input
            type="text"
            className="write_msg"
            placeholder="Mensaje..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{ width: 300 }}
          />
        </div>
        <input
          type="file"
          accept="image/*"
          name="image"
          id="file"
          onChange={(e) => loadImage(e)}
          style={{ width: 65, height: 25 }}
        />
        {/* <label htmlFor="image">Upload Image</label> */}
        {image && (
          <img
            src={image}
            style={{ width: 25, height: 25, marginLeft: 10 }}
            alt="load"
          />
        )}

        {/* <div className="col-sm-3 text-center"> */}
        <button
          style={{
            width: 60,
            height: 25,
            backgroundColor: "blue",
            borderRadius: 5,
            color: "white",
            marginLeft: 10,
          }}
          type="submit"
        >
          enviar
        </button>
        {/* </div> */}
      </div>
    </form>
  );
};
