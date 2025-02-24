import moment from "moment";
import React from "react";

function Message({ message }) {
  const authUser = JSON.parse(localStorage.getItem("ChatApp"));
  const itsMe = message.senderId === authUser.user._id;

  const chatName = itsMe ? " chat-end" : "chat-start";
  const chatColor = itsMe ? "bg-blue-500" : "";

  const createdAt = new Date(message.createdAt);
  const currentDate = new Date();
  const dateCheck = moment(currentDate).format('DD-MM-YYYY') == moment(createdAt).format('DD-MM-YYYY')
  const formattedTime = createdAt.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
    <div>
      <div className="p-4">
        <div className={`chat ${chatName}`}>
          <div className={`chat-bubble text-white ${chatColor}`}>
            {message.message}
          </div>
          <div className="chat-footer">{dateCheck ? formattedTime : moment(createdAt).format('DD-MM-YYYY HH:mm:ss')}</div>
        </div>
      </div>
    </div>
  );
}

export default Message;
