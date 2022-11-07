import React, { FC, useContext } from "react";
import { Message } from "../interfaces/models";
// import moment from "moment";
import { getHours } from "../helpers/getHours";
import { ChatContext } from "../context/chat/ChatContext";

interface Props {
  message: Message;
}
export const IncomingMessage: FC<Props> = ({ message }) => {
  const date = getHours(message.createAt!);
  const { chatState } = useContext(ChatContext);
  // console.log(date);
  return (
    <>
      <div className="incoming_msg">
        <div className="incoming_msg_img">
          <img
            style={{ borderRadius: 100 }}
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
            alt="profile"
          />
        </div>
        <div className="received_msg">
          <div className="received_withd_msg">
            <p>
              {" "}
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
                message.message.substring(0, 50) +
                message.message.substring(50, 150)
              )}
            </p>
            <span className="time_date">{date}</span>
          </div>
        </div>
      </div>
    </>
  );
};
