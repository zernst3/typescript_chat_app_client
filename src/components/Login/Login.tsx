import React from "react";
import { Link } from "react-router-dom";
import Words from "../translation";
import "./Login.css";

const Login: React.FC<any> = ({
  setName,
  setChatRoom,
  setLanguage,
  name,
  chatRoom,
  language,
}) => {
  return (
    <div id="loginOuterContainer">
      <div id="loginInnerContainer">
        <h1 className="title">
          <img
            src="https://cdn2.iconfinder.com/data/icons/ios7-inspired-mac-icon-set/1024/messages_5122x.png"
            alt="Join the Chatroom"
          />
        </h1>
        <div>
          <label htmlFor="name">{Words[language].inputYourName}</label>
          <input
            defaultValue={name}
            name="name"
            className="input"
            type="text"
            onChange={(evt) => setName(evt.target.value)}
          />
        </div>
        <div>
          <label htmlFor="chatRoom">{Words[language].inputChatRoomName}</label>
          <input
            defaultValue={chatRoom}
            name="chatRoom"
            className="input"
            type="text"
            onChange={(evt) => setChatRoom(evt.target.value)}
          />
        </div>
        <div>
          <label htmlFor="language">{Words[language].selectLanguage}</label>
          <select
            name="language"
            onChange={(evt) => setLanguage(evt.target.value)}
          >
            <option value={language}>
              {Words[language].currentLanguage}: {Words[language].language}
            </option>
            {Object.keys(Words).map((language, idx) => (
              <option key={idx} value={language}>
                {Words[language].language}
              </option>
            ))}
          </select>
        </div>

        <Link to="/chat">
          <button disabled={!name || !chatRoom}>{Words[language].join}</button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
