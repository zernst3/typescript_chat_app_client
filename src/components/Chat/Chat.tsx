import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Socket } from "socket.io-client";
import Axios from "axios";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import Messages from "../Messages/Messages";
import Users from "../Users/Users";
import Words from "../translation";
import "./Chat.css";
const { v4: uuidv4 } = require("uuid");

const io = require("socket.io-client");

let AZURESUBSCRIPTIONKEY = process.env.AZURESUBSCRIPTIONKEY || undefined;
let AZUREENDPOINT = process.env.AZUREENDPOINT || undefined;
let LOCATION = process.env.LOCATION || undefined;

if (process.env.NODE_ENV === "development") {
  AZURESUBSCRIPTIONKEY = require("../../secrets").AZURESUBSCRIPTIONKEY;
  AZUREENDPOINT = require("../../secrets").AZUREENDPOINT;
  LOCATION = require("../../secrets").LOCATION;
}

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
      const getTranslatedText = async () => {
        try {
          const res = await Axios({
            baseURL: AZUREENDPOINT,
            url: "/translate",
            method: "post",
            headers: {
              "Ocp-Apim-Subscription-Key": AZURESUBSCRIPTIONKEY,
              "Ocp-Apim-Subscription-Region": LOCATION,
              "Content-type": "application/json",
              "X-ClientTraceId": uuidv4().toString(),
            },
            params: {
              "api-version": "3.0",
              from: message.language,
              to: language,
            },
            data: [
              {
                text: message.text,
              },
            ],
            responseType: "json",
          });
          const originalText: string = message.text;
          message.text = res.data[0]["translations"][0]["text"];
          console.log(`${originalText} => ${message.text}`);
          setMessages((messages) => [...messages, message]);
        } catch (err) {
          console.log(err);
        }
      };
      if (
        (language !== message.language && !AZURESUBSCRIPTIONKEY) ||
        !AZUREENDPOINT ||
        !LOCATION
      ) {
        message.text = `(${Words[language]["translationUnavailableAtThisTime"]}) ${message.text}`;
        setMessages((messages) => [...messages, message]);
      } else if (language !== message.language) {
        getTranslatedText();
      } else {
        setMessages((messages) => [...messages, message]);
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
      <Users users={users} language={language} />
      <div id="chatInnerContainer">
        <InfoBar chatRoom={chatRoom} language={language} />
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
          language={language}
        />
      </div>
    </div>
  ) : (
    <Redirect to="/" />
  );
};

export default Chat;
