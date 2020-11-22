import React from "react";
import Message from "../Message/Message";
import ScrollToBottom from "react-scroll-to-bottom";
import { MessageInterface } from "../Chat/Chat";
import Fade from "react-reveal/Fade";
import "./Messages.css";

const Messages: React.FC<any> = ({ messages, name, users }) => (
  <ScrollToBottom className="messages">
    <Fade duration={500}>
      <React.Fragment>
        {messages.map((message: MessageInterface, idx: number) => (
          <div key={idx}>
            <Message message={message} name={name} />
          </div>
        ))}
      </React.Fragment>
    </Fade>
  </ScrollToBottom>
);

export default Messages;
