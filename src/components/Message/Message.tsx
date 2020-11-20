import React from "react";
import "./Message.css";

const Message: React.FC<any> = ({
  message: { user, text, language },
  name,
}) => {
  let isSentByCurrentUser = false;

  if (user === name) {
    isSentByCurrentUser = true;
  }

  return isSentByCurrentUser ? (
    <div className="messageOuterContainer">
      <div className="messageContainer currentUser">
        <div className="messageBox">
          <p className="messageText">{text}</p>
        </div>
        <p className="sentText">
          {name} ({language})
        </p>
      </div>
    </div>
  ) : (
    <div className="messageOuterContainer">
      <div className="messageContainer otherUser">
        <div className="messageBox">
          <p className="messageText">{text}</p>
        </div>
        <p className="sentText">
          {user} ({language})
        </p>
      </div>
    </div>
  );
};

export default Message;
