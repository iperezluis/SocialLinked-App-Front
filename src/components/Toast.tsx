import React, { FC, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Toast from "react-bootstrap/Toast";

interface Props {
  name: string;
  picture: string;
  body: string;
  active: boolean;
  onClose: () => void;
}
const ToastComponent: FC<Props> = ({
  name,
  picture,
  body,
  active,
  onClose,
}) => {
  return (
    <Row>
      <Col
        md={6}
        style={{ position: "absolute", bottom: 10, right: -280, zIndex: 999 }}
      >
        {/* <Button onClick={toggleShowA} className="mb-2">
          Toggle Toast <strong>with</strong> Animation
        </Button> */}
        <Toast show={active} onClose={onClose}>
          <Toast.Header>
            <img
              src={picture}
              className="rounded me-2"
              style={{ height: 30, width: 30, borderRadius: 100 }}
              alt="img"
            />
            <strong className="me-auto">{name}</strong>
            <small>Just now</small>
          </Toast.Header>
          <Toast.Body>{body}</Toast.Body>
        </Toast>
      </Col>
    </Row>
  );
};

export default ToastComponent;
