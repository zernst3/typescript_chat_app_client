import React from "react";
import Message from "../Message/Message";
import ScrollToBottom from "react-scroll-to-bottom";
import { MessageInterface } from "../Chat/Chat";
import "./Messages.css";

const Messages: React.FC<any> = ({ messages, name }) => (
  <ScrollToBottom className="messages">
    {messages.map((message: MessageInterface, idx: number) => (
      <div key={idx}>
        <Message message={message} name={name} />
      </div>
    ))}
  </ScrollToBottom>
);

export default Messages;
