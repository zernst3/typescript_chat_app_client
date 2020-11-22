import React from "react";
import { Link } from "react-router-dom";
import Words from "../translation";
import "./InfoBar.css";

const InfoBar: React.FC<any> = ({
  chatRoom,
  language,
  setShowUsers,
  showUsers,
}) => (
  <div id="infoBar">
    <h1>
      {Words[language].chatRoom}: {chatRoom}
    </h1>
    <div>
      <button onClick={() => setShowUsers(!showUsers)}>
        {Words[language].showUsers}
      </button>
      {!showUsers && (
        <Link to="/">
          <p className="desktop">{Words[language].close}</p>
          <p className="mobile">X</p>
        </Link>
      )}
    </div>
  </div>
);

export default InfoBar;
