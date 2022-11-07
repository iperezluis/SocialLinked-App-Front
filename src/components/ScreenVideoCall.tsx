import { FC, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

interface Props {
  showModal: boolean;
  title: string;
  body: string;
  onClose: () => void;
  startVideoCall?: () => void;
  rejectVideoCall: () => void;
}
const ScreenVideoCall: FC<Props> = ({
  showModal,
  title,
  body,
  onClose,
  startVideoCall,
  rejectVideoCall,
}) => {
  // const [onClose, setOnClose] = useState(!showModal);

  return (
    <Modal
      show={showModal}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header
        closeButton
        onClick={onClose}
        style={{
          flexDirection: "column",
          display: "flex",
          justifyContent: "center",
          // alignItems: "center",
        }}
      >
        <Modal.Title
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
          // id="contained-modal-title-vcenter"
        >
          <div>{title}</div>
          <svg
            style={{ marginLeft: 15 }}
            id="loading-bar"
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="22"
            viewBox="0 0 36 22"
          >
            <g>
              <rect id="loading-bar-left" width="8" height="22" />
              <rect id="loading-bar-middle" width="8" height="22" x="14" />
              <rect id="loading-bar-right" width="8" height="22" x="28" />
            </g>
          </svg>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body
        style={{
          display: "flex",
          // flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h4>{body}</h4>
      </Modal.Body>
      <Modal.Footer>
        <Button className="btn btn-success" onClick={startVideoCall}>
          Contestar
        </Button>
        <Button className="btn btn-danger" onClick={rejectVideoCall}>
          Rechazar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ScreenVideoCall;
