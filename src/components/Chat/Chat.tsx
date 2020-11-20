import React, { useState, useEffect } from "react";
import { Socket } from "socket.io-client";
import Axios from "axios";
import { RouteComponentProps } from "react-router-dom";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";

const io = require("socket.io-client");
const ENDPOINT = process.env.ENDPOINT || "localhost:8080";

interface Message {
  user: string;
  text: string;
  language: string;
}

let socket: Socket;

const Chat: React.FC<any> = ({ name, chatRoom, language }) => {
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
      socket.emit("disconnectFromServer");
      console.log("Disconnected from the server");
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

  return (
    <div className="chatOuterContainer">
      <h1>Chat</h1>
      <div className="innerContainer">
        <InfoBar chatRoom={chatRoom} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
};

export default Chat;
