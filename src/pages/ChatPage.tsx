import { useContext, useState, useEffect } from "react";
import "../css/chat.css";
import { InboxPeople } from "../components/InboxPeople";
import { SelectChat } from "../components/SelectChat";
import { ChatContext } from "../context/chat/ChatContext";
import { Messages } from "../components/Messages";
import { SocketContext } from "../context/SocketContext";
import ToastComponent from "../components/Toast";
import ScreenVideoCall from "../components/ScreenVideoCall";
import {
  openCamera,
  drawImage,
  closeCamera,
  muteAudio,
} from "../helpers/mediaStream";
import { AuthContext } from "../auth/AuthContext";
import { Alert, Spinner } from "react-bootstrap";
import { Mic, MicMute, TelephoneX } from "react-bootstrap-icons";

export const ChatPage = () => {
  const { chatState } = useContext(ChatContext);
  const { socket } = useContext(SocketContext);
  const { auth } = useContext(AuthContext);
  const [showA, setShowA] = useState(false);
  const toggleShowA = () => setShowA(!showA);
  const onClose = () => setShowA(false);
  const [isCalling, setIsCalling] = useState<boolean>(false);
  const [fromMessage, setFromMessage] = useState<string>("");
  const [fromVideoCall, setFromVideoCall] = useState<string>("");
  const [toVideoCall, setToVideoCall] = useState<string>("");
  const [userTo, setUserTo] = useState<string>("");
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertTo, setShowAlertTo] = useState(false);
  const [showAlertFinished, setshowAlertFinished] = useState(false);
  const [showAlertFinishedFrom, setshowAlertFinishedFrom] = useState(false);
  const [showOnline, setShowOnline] = useState(false);
  const [showOffline, setShowOffline] = useState(false);
  const [onLive, setOnLive] = useState(true);
  const [OutgoingCall, setOutgoingCall] = useState(false);
  const [onSilent, setOnSilent] = useState(false);
  const [missedCallFrom, setMissedCallFrom] = useState("");
  const [missedCall, setMissedCall] = useState<boolean>(false);

  const checkConnection = () => {
    //chek offline
    console.log("STATUS", window.navigator.onLine);
    window.addEventListener(
      "offline",
      (e) => {
        console.log("este es offline", e);
        setShowOffline(true);
        setTimeout(() => {
          setShowOffline(false);
        }, 5000);
      },
      false
    );
    //chek online
    window.addEventListener(
      "online",
      (e) => {
        console.log("este es online", e);
        setShowOnline(true);
        setTimeout(() => {
          setShowOnline(false);
        }, 5000);
      },
      false
    );
  };

  useEffect(() => {
    checkConnection();
  }, []);

  const updateMessages = () => {
    return <Messages />;
  };
  socket?.on("new-notification", (messageFrom) => {
    console.log("new message from:", messageFrom);
    setFromMessage(messageFrom.nombre);
    toggleShowA();
    updateMessages();
    setTimeout(() => {
      onClose();
    }, 5000);
  });

  socket?.on("recibiendo-videollamada", (callFrom) => {
    console.log("Te esta llamando: ", callFrom);
    setIsCalling(true);
    setUserTo(callFrom.uid);
    setFromVideoCall(callFrom.nombre);
  });
  socket?.on("llamada-saliente", (callback) => {
    console.log("llamando a: ", callback.nombre);
    console.log(callback);
    setUserTo(callback.uid);
    setToVideoCall(callback.nombre);
    setOutgoingCall(true);
    // setIsCalling(true);
    // setUserTo(callFrom.uid);
    // setFromVideoCall(callFrom.nombre);
  });
  socket?.on("llamada-contestada", (callback) => {
    console.log("llamada contestada", callback);
    setOutgoingCall(false);
    setIsCalling(false);
    openCamera();
    drawImage();
  });
  socket?.on("llamada-cancelada-from", (callback) => {
    ///Desiret
    console.log("llamada perdida de", callback.nombre);
    setMissedCallFrom(callback.nombre);
    setOutgoingCall(false);
    setIsCalling(false);
    setMissedCall(true);
    setTimeout(() => {
      setMissedCall(false);
    }, 10000);
  });
  socket?.on("llamada-cancelada-to", (callback) => {
    ///LUIS ALEJANDRO
    console.log("cancelaste la llamada a", callback.nombre);
    setOutgoingCall(false);
    setIsCalling(false);
  });
  socket?.on("en-vivo", (callback) => {
    console.log("estas en vivo con: ", callback.nombre);
    setFromVideoCall(callback.nombre);
    setOutgoingCall(false);
    setShowAlert(true);
    openCamera();
    drawImage();
    // setShowAlertTo(true);
    setOnLive(false);
  });
  socket?.on("en-vivo-con", (callback) => {
    console.log("estas-en-vivo con: ", callback.nombre);
    setOutgoingCall(false);
    setToVideoCall(callback.nombre);
    // setShowAlert(true);
    openCamera();
    drawImage();
    setShowAlertTo(true);
    setOnLive(false);
  });
  socket?.on("llamada-finalizada", (callback) => {
    console.log(`llamada con ${callback.nombre} finalizada :(`);
    setFromVideoCall(callback.nombre);
    closeCamera();
    setOnLive(true);
    setShowAlert(false);
    setShowAlertTo(false);
    //DESIRET
    setshowAlertFinished(true);
    setTimeout(() => {
      setshowAlertFinished(false);
    }, 5000);
  });
  socket?.on("llamada-finalizada-from", (callback) => {
    console.log(`llamada con ${callback.nombre} finalizada :(`);
    setToVideoCall(callback.nombre);
    closeCamera();
    setOnLive(true);
    setShowAlert(false);
    setShowAlertTo(false);
    //luis laejandro
    setshowAlertFinishedFrom(true);
    setTimeout(() => {
      setshowAlertFinishedFrom(false);
    }, 5000);
  });

  const startVideoCall = () => {
    setIsCalling(false);
    //Todo abrid la camera de mi navegador y el del cliente
    socket?.emit("llamada-contestada", {
      status: true,
      from: auth.uid,
      to: userTo,
    });
    setOnLive(false);
  };
  const rejectVideoCall = () => {
    setIsCalling(false);
    setOnLive(true);
    //Todo abrid la camera de mi navegador y el del cliente
    socket?.emit("llamada-cancelada", {
      status: false,
      from: auth.uid,
      to: userTo,
    });
  };
  const finishVideoCall = () => {
    //Todo abrid la camera de mi navegador y el del cliente
    closeCamera();
    setOnLive(true);
    setShowAlert(false);
    setShowAlertTo(false);
    setshowAlertFinished(true);
    setshowAlertFinishedFrom(true);
    setTimeout(() => {
      setshowAlertFinishedFrom(false);
      setshowAlertFinished(false);
    }, 5000);
    socket?.emit("finalizar-llamada", {
      status: false,
      from: auth.uid,
      to: userTo,
    });
  };

  const startSilent = () => {
    muteAudio();
    setOnSilent(!onSilent);
  };

  return (
    <div className="inbox_msg">
      <div className="messaging">
        <InboxPeople />
        {/* this select chat es si el usuario n oha seleccioando ningun chat entonces muestra un icono */}
        {chatState.chatActivo ? (
          <div style={{ height: "90vh" }}>
            <Messages />
          </div>
        ) : (
          <SelectChat />
        )}
      </div>
      {isCalling && (
        <ScreenVideoCall
          rejectVideoCall={() => rejectVideoCall()}
          startVideoCall={() => startVideoCall()}
          onClose={() => {
            setIsCalling(false);
          }}
          showModal={isCalling}
          title={"Video llamada entrante"}
          body={`${fromVideoCall} te esta llamando...`}
        />
      )}
      {/* llamada saliente */}
      {OutgoingCall && (
        <ScreenVideoCall
          rejectVideoCall={() => rejectVideoCall()}
          onClose={() => {
            setIsCalling(false);
          }}
          showModal={OutgoingCall}
          title={"Iniciando video llamada"}
          body={`Por favor espere a  que ${toVideoCall} conteste...`}
        />
      )}
      <ToastComponent
        name={fromMessage}
        picture={
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
        }
        body={`Te ha enviado un nuevo mensaje`}
        active={showA}
        onClose={onClose}
      />

      {showAlert && (
        <>
          <Alert
            show={showAlert}
            variant={"success"}
            style={{ zIndex: 999 }}
          >{`Estas en vivo con ${
            fromVideoCall.length > 20
              ? fromVideoCall.substring(0, 20) + "..."
              : fromVideoCall
          }`}</Alert>
          <Spinner
            animation="grow"
            style={{
              position: "absolute",
              top: 10,
              right: fromVideoCall.length > 20 ? "34vw" : "37vw",
              zIndex: 999,
            }}
          />
        </>
      )}
      {showAlertTo && (
        <>
          <Alert
            show={showAlertTo}
            variant={"success"}
            style={{
              zIndex: 999,
              position: "absolute",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              top: 0,
              right: 0,
              left: 0,
              height: "10vh",
            }}
          >
            {`Estas en vivo con ${
              toVideoCall.length > 20
                ? toVideoCall.substring(0, 20) + "..."
                : toVideoCall
            }`}
          </Alert>
          <Spinner
            animation="grow"
            style={{
              position: "absolute",
              top: 10,
              right: "37vw",
              zIndex: 999,
            }}
          />
        </>
      )}
      {showAlertFinished && (
        <Alert
          show={showAlertFinished}
          variant={"success"}
          style={{ zIndex: 999 }}
        >{`Videollamada con ${fromVideoCall} finalizada.`}</Alert>
      )}
      {showAlertFinishedFrom && (
        <Alert
          show={showAlertFinishedFrom}
          variant={"success"}
          style={{
            zIndex: 999,
            position: "absolute",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            top: 0,
            right: 0,
            left: 0,
            height: "10vh",
          }}
        >{`Videollamada con ${toVideoCall} finalizada.`}</Alert>
      )}
      {showOnline && (
        <Alert show={showOnline} variant={"success"} style={{ zIndex: 999 }}>
          {"Se ha restablecido la conexion a internet"}
        </Alert>
      )}
      {showOffline && (
        <Alert show={showOffline} variant={"danger"} style={{ zIndex: 999 }}>
          {"Se ha perdido la conexion a internet"}
        </Alert>
      )}

      {missedCall && (
        <Alert
          show={missedCall}
          variant={"danger"}
          style={{
            zIndex: 999,
            position: "absolute",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            top: 0,
            right: 0,
            left: 0,
            height: "10vh",
          }}
        >
          {`Tienes una llamada perdida de ${missedCallFrom}`}
        </Alert>
      )}
      {/* <!-- Stream video via webcam --> */}
      <div
        hidden={!showAlert && !showAlertTo}
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          background: "rgba(255,255,255,0.5)",
        }}
      >
        <div
          id="video-wrap"
          style={{
            position: "absolute",
            bottom: "20vh",
            top: "15vh",
            right: "30vw",
            left: "25vw",
            // backgroundColor: "red",
          }}
        >
          {/* <video id="video" autoPlay playsInline  ></video> */}
        </div>
      </div>

      {/* <!-- Trigger canvas web API --> */}
      <div className="controller">
        <button
          // className="btn btn-primary"
          id="snap"
          // style={{ position: "absolute" }}
        ></button>
        <button
          hidden={onLive}
          className="btn btn-danger"
          onClick={finishVideoCall}
          style={{
            position: "absolute",
            left: "55vw",
            bottom: "15vh",
            borderRadius: 100,
            // height: 50,
            // width: 50,
          }}
        >
          Finalizar llamada <TelephoneX size={25} color="#FFF" />
        </button>
        <button
          hidden={onLive}
          className="btn btn-dark"
          onClick={startSilent}
          style={{
            position: "absolute",
            left: "45vw",
            bottom: "15vh",
            borderRadius: 100,
            height: 50,
            width: 50,
          }}
        >
          {onSilent ? (
            <MicMute size={25} color="#FFF" />
          ) : (
            <Mic size={25} color="#FFF" />
          )}
        </button>
      </div>

      {/* <!-- Webcam video snapshot --> */}
      <div id="myCanvas"></div>
      {/* <canvas id="canvas" width="640" height="480" translate="yes"></canvas> */}
    </div>
  );
};
