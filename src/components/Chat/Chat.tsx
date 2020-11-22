import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Socket } from "socket.io-client";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import Messages from "../Messages/Messages";
import Users from "../Users/Users";
import Words from "../translation";
import "./Chat.css";
// Need to get this to work and detect envirements
// import { getEndpoint } from "../../endpoint";
const ENDPOINT: string = "https://zernst-typescript-chat-app-s.herokuapp.com/";

const io = require("socket.io-client");

export interface MessageInterface {
  user: string;
  text: string;
  language: string;
}

interface TranslatedMessage {
  originalText: string;
  message: MessageInterface;
  targetLanguage: string;
}

let socket: Socket;

const Chat: React.FC<any> = ({ name, chatRoom, language }) => {
  const [messages, setMessages] = useState<Array<MessageInterface>>([]);
  const [message, setMessage] = useState<string>("");
  const [users, setUsers] = useState<Array<string>>([]);
  const [showUsers, setShowUsers] = useState<Boolean>(false);

  useEffect(() => {
    socket = io(ENDPOINT);

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
      const getTranslatedText = (
        message: MessageInterface,
        targetLanguage: string
      ) => {
        socket.emit("translate", {
          message,
          targetLanguage,
        });
      };
      if (language !== message.language) {
        getTranslatedText(message, language);
      } else {
        setMessages((messages) => [...messages, message]);
      }
    });

    socket.on("translatedMessage", (translatedMessage: TranslatedMessage) => {
      const { message, originalText, targetLanguage } = translatedMessage;
      if (message.text === "translationUnavailable") {
        message.text = `${Words[targetLanguage]["translationUnavailableAtThisTime"]} ${message.text}`;
      } else {
        setMessages((messages) => [...messages, message]);
        console.log(`${originalText} => ${message.text}`);
      }
    });

    socket.on("userData", (usersFromServer: Array<string>) => {
      setUsers(usersFromServer);
    });
  }, []);

  const sendMessage = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    evt.preventDefault();

    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  return name && chatRoom ? (
    <div id="chatOuterContainer">
      <div id="chatInnerContainer">
        <InfoBar
          chatRoom={chatRoom}
          language={language}
          setShowUsers={setShowUsers}
          showUsers={showUsers}
        />
        {showUsers && <Users users={users} language={language} />}
        {!showUsers && (
          <React.Fragment>
            <Messages messages={messages} name={name} />
            <Input
              message={message}
              setMessage={setMessage}
              sendMessage={sendMessage}
              language={language}
            />
          </React.Fragment>
        )}
      </div>
    </div>
  ) : (
    <Redirect to="/" />
  );
};

export default Chat;
