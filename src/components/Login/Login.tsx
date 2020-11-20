import React from "react";
import { Link } from "react-router-dom";
import "./Login.css";

const Login: React.FC<any> = ({
  setName,
  setChatRoom,
  setLanguage,
  name,
  chatRoom,
}) => {
  return (
    <div id="loginOuterContainer">
      <div id="loginInnerContainer">
        <h1 className="title">
          <img
            src="https://cdn2.iconfinder.com/data/icons/ios7-inspired-mac-icon-set/1024/messages_5122x.png"
            alt="Join the Chatroom"
          />{" "}
        </h1>
        <div>
          <label htmlFor="name">Input Your Name:</label>
          <input
            defaultValue={name}
            name="name"
            className="input"
            type="text"
            onChange={(evt) => setName(evt.target.value)}
          />
        </div>
        <div>
          <label htmlFor="chatRoom">Input Chat Room Name:</label>
          <input
            defaultValue={chatRoom}
            name="chatRoom"
            className="input"
            type="text"
            onChange={(evt) => setChatRoom(evt.target.value)}
          />
        </div>
        <div>
          <label htmlFor="language">Select Language:</label>
          <select
            name="language"
            onChange={(evt) => setLanguage(evt.target.value)}
          >
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
          </select>
        </div>

        <Link to="/chat">
          <button disabled={!name || !chatRoom}>Join</button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
