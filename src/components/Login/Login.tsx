import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [chatRoom, setChatRoom] = useState<string>("");
  const [language, setLanguage] = useState<string>("English");

  return (
    <div id="loginOuterContainer">
      <div id="loginInnerContainer">
        <h1 className="title">Join the chatroom</h1>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            name="name"
            placeholder=""
            className="input"
            type="text"
            onChange={(evt) => setName(evt.target.value)}
          />
        </div>
        <div>
          <label htmlFor="chatRoom">Chat Room:</label>
          <input
            name="chatRoom"
            placeholder=""
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
        <Link
          onClick={(evt) => (!name || !chatRoom ? evt.preventDefault() : null)}
          to={{ pathname: `/chat`, state: { name, chatRoom, language } }}
        >
          <button>Join</button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
