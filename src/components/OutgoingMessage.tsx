import React from "react";
import { getHours } from "../helpers/getHours";
import { Message } from "../interfaces/models";

interface Props {
  message: Message;
}
export const OutgoingMessage = ({ message }: Props) => {
  const date = getHours(message.createAt!);
  return (
    <div className="outgoing_msg">
      <div className="sent_msg">
        <p>
          {message.message.startsWith("https") ? (
            <img
              src={message.message}
              style={{
                width: "28vw",
                height: "38vh",
                backgroundColor: "#FFF",
                // marginLeft: 10,
                // position: "absolute",
                // bottom: 50,
                // right: 380,
              }}
              alt="load"
            />
          ) : (
            message.message
          )}
        </p>
        <span className="time_date">{date}</span>
      </div>
    </div>
  );
};
