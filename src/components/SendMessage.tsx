import React, {
  ChangeEvent,
  FormEvent,
  useContext,
  useState,
  useRef,
} from "react";
import { CameraVideo, Image, Send } from "react-bootstrap-icons";
import { apiChat } from "../api/ApiChat";

import { AuthContext } from "../auth/AuthContext";
import { ChatContext } from "../context/chat/ChatContext";
import { SocketContext } from "../context/SocketContext";

export const SendMessage = () => {
  const [message, setMessage] = useState<string>("");
  const { auth } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);
  const { chatState } = useContext(ChatContext);
  const [URLimage, setURLImage] = useState<string>();
  const inputFileRef = useRef<HTMLInputElement>(null);
  // const onSubmitRef = useRef<HTMLFormElement>(null);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(message);
    if (message.length === 0 || !message) {
      return;
    }
    socket?.emit("enviar-mensaje", {
      from: auth.uid,
      to: chatState.chatActivo, //el chatActivo contiene el uid del usuario cuando clickeaste el screen
      message: message,
      image: URLimage,
    });
    setMessage("");
    setURLImage("");
  };
  const loadImage = async ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (!target.files || target.files.length === 0) {
      return;
    }
    try {
      // setImage(URL.createObjectURL(target.files![0]));
      const file = target.files![0];
      console.log("file enviada:", file);
      const formData = new FormData();
      formData.append("file", file);
      const { data } = await apiChat.post<{ message: string }>(
        "/imageuser",
        formData
      );
      console.log("URL de cloudinary:", data.message);
      setURLImage(data.message);
      setMessage(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const clearMessage = () => {
    document.querySelector("#message")?.setAttribute("value", "''");
    let file = document.querySelector("#message");
    console.log("file features", file);
    setURLImage("");
    setMessage("");
    //eliminar de cloudinary
  };

  const initVideoCall = () => {
    socket?.emit("iniciando-videollamada", {
      from: auth.uid,
      to: chatState.chatActivo, //el chatActivo contiene el uid del usuario cuando clickeaste el screen
      isCalling: true,
      message: message,
      image: URLimage,
    });
  };

  return (
    <form
      action=" "
      onSubmit={(e) => onSubmit(e)}
      encType="multipart/form-data"
      style={{ height: "50vh" }}
    >
      {/* <div className="type_msg row"> */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "rgba(255,255,255,0.2)",
        }}
      >
        {URLimage && (
          <>
            <button
              onClick={clearMessage}
              style={{
                width: 25,
                height: 25,
                borderRadius: 100,
                position: "absolute",
                backgroundColor: "#000",
                bottom: "38vh",
                right: "29vw",
              }}
            >
              <p
                style={{
                  fontSize: 25,
                  color: "#FFF",
                  position: "absolute",
                  top: -10,
                  right: 4,
                }}
              >
                &times;
              </p>
            </button>
            <img
              src={URLimage}
              style={{
                width: "20vw",
                height: "30vh",
                // marginLeft: 10,
                position: "absolute",
                bottom: "10vh",
                right: "28vw",
              }}
              alt="load"
            />
          </>
        )}
        <div className="" style={{ marginRight: 10 }}>
          <input
            id="message"
            type="text"
            className="write_msg"
            placeholder="Mensaje..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{
              width: "30vw",
              borderRadius: 10,
              height: "5vh",
            }}
          />
        </div>

        <button
          type="submit"
          className="btn btn-success"
          // onClick={() => onSubmitRef.current?.onsubmit()}
        >
          <Send color="#FFF" size={20} />
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => inputFileRef.current?.click()}
        >
          Imagen <Image color="#FFF" size={20} />
        </button>

        {/* <FontAwesomeIcon icon="youtube" size="lg" visibility={"100"} /> */}
        <input
          ref={inputFileRef}
          type="file"
          accept="image/png, image/gif, image/jpeg, image/jpg"
          style={{ display: "none" }}
          name="image"
          id="file"
          onChange={(e) => loadImage(e)}
        />

        <button type="button" className="btn btn-dark" onClick={initVideoCall}>
          Video llamada <CameraVideo color="#FFF" size={20} />
        </button>
        {/* <label htmlFor="image">Upload Image</label> */}

        {/* <div className="col-sm-3 text-center"> */}

        {/* </div> */}
      </div>
    </form>
  );
};
