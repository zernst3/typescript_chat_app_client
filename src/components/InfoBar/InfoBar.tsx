import React from "react";
import { Link } from "react-router-dom";
import "./InfoBar.css";

const InfoBar: React.FC<any> = ({ chatRoom }) => (
  <div id="infoBar">
    <h1>Chat Room: {chatRoom}</h1>
    <Link to="/">Close</Link>
  </div>
);

export default InfoBar;
