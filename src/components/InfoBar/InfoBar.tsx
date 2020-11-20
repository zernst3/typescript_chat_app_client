import React from "react";
import { Link } from "react-router-dom";

const InfoBar: React.FC<any> = ({ chatRoom }) => (
  <div id="infoBar">
    <div className="leftInnerContainer">
      <h3>Chat Room: {chatRoom}</h3>
    </div>
    <div className="rightInnerContainer">
      <Link to="/">Close</Link>
    </div>
  </div>
);

export default InfoBar;
