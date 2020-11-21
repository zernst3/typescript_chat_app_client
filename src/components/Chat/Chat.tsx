import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Socket } from "socket.io-client";
import Axios from "axios";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import Messages from "../Messages/Messages";
import Users from "../Users/Users";
import { azuresubscriptionKey, azureendpoint, location } from "../../secrets";
import "./Chat.css";
const { v4: uuidv4 } = require("uuid");

const io = require("socket.io-client");
const ENDPOINT = process.env.ENDPOINT || "localhost:8080";

export interface MessageInterface {
  user: string;
  text: string;
  language: string;
}

let socket: Socket;
let count = 0;

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
            baseURL: azureendpoint,
            url: "/translate",
            method: "post",
            headers: {
              "Ocp-Apim-Subscription-Key": azuresubscriptionKey,
              "Ocp-Apim-Subscription-Region": location,
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

          message.text = res.data[0]["translations"][0]["text"];
          console.log(count);
          count++;
          setMessages([...messages, message]);
        } catch (err) {
          console.log(err);
        }
      };
      if (language !== message.language) {
        getTranslatedText();
      } else {
        console.log(count);
        count++;
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
