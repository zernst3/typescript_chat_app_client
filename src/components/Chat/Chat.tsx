import React, { useState, useEffect } from "react";
import { Socket } from "socket.io-client";
import Axios from "axios";
import { RouteComponentProps } from "react-router-dom";
import InfoBar from "../InfoBar/InfoBar";

const io = require("socket.io-client");
const ENDPOINT = process.env.ENDPOINT || "localhost:8080";

interface Message {
  user: string;
  text: string;
}

let socket: Socket;

const Chat: React.FC<RouteComponentProps> = (props: any) => {
  const { name, chatRoom, language } = props.location.state;
  const [messages, setMessages] = useState<Array<Message>>([]);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    socket = io(ENDPOINT, {
      withCredentials: true,
      extraHeaders: {
        "my-custom-header": "abcd",
      },
    });

    socket.on("connect", () => {
      console.log(`I am now connected to the server with id: ${socket.id}`);
    });

    socket.emit("login", { name, chatRoom, language }, () => {});

    // unmounting
    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [name, chatRoom, language]);

  useEffect(() => {
    socket.on("message", (message: Message) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  const sendMessage = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    evt.preventDefault();

    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  console.log(message, messages);

  return (
    <div className="chatOuterContainer">
      <h1>Chat</h1>
      <div className="innerContainer">
        <InfoBar chatRoom={chatRoom} />
        <input
          value={message}
          onChange={(evt) => setMessage(evt.target.value)}
          onKeyPress={(evt) => (evt.key === "Enter" ? sendMessage(evt) : null)}
        />
      </div>
    </div>
  );
};

export default Chat;
