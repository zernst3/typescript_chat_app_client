import React from "react";
import { Link } from "react-router-dom";
import Words from "../translation";
import "./InfoBar.css";

const InfoBar: React.FC<any> = ({ chatRoom, language }) => (
  <div id="infoBar">
    <h1>
      {Words[language].chatRoom}: {chatRoom}
    </h1>
    <Link to="/">{Words[language].close}</Link>
  </div>
);

export default InfoBar;
