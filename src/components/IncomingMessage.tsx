import React from "react";
import { Message } from "../interfaces/models";
import moment from "moment";
import { getHours } from "../helpers/getHours";

interface Props {
  message: Message;
}
export const IncomingMessage = ({ message }: Props) => {
  const date = getHours(message.createAt!);
  // console.log(date);
  return (
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
          <p>{message.message}</p>
          <span className="time_date">{date}</span>
        </div>
      </div>
    </div>
  );
};
