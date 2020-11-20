import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Socket } from "socket.io-client";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import Messages from "../Messages/Messages";
import Users from "../Users/Users";
import "./Chat.css";

const io = require("socket.io-client");
const ENDPOINT = process.env.ENDPOINT || "localhost:8080";

export interface MessageInterface {
  user: string;
  text: string;
  language: string;
}

let socket: Socket;

const Chat: React.FC<any> = ({ name, chatRoom, language }) => {
  const [messages, setMessages] = useState<Array<MessageInterface>>([]);
  const [message, setMessage] = useState<string>("");
  const [users, setUsers] = useState<Array<string>>([]);

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
    socket.on("message", (message: MessageInterface) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  useEffect(() => {
    socket.on("userJoin", (usersFromServer: Array<string>) => {
      setUsers([...users, ...usersFromServer]);
    });
  }, [users]);

  useEffect(() => {
    socket.on("userLeave", (usersFromServer: Array<string>) => {
      setUsers(usersFromServer);
    });
  }, [users]);

  const sendMessage = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    evt.preventDefault();

    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  return name && chatRoom ? (
    <div id="chatOuterContainer">
      <Users users={users} />
      <div id="chatInnerContainer">
        <InfoBar chatRoom={chatRoom} />
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  ) : (
    <Redirect to="/" />
  );
};

export default Chat;
