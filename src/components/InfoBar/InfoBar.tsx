import React from "react";

const InfoBar: React.FC<any> = ({ chatRoom }) => (
  <div id="infoBar">
    <div className="leftInnerContainer">
      <h3>Chat Room: {chatRoom}</h3>
    </div>
    <div className="rightInnerContainer">
      <a href="/">Close</a>
    </div>
  </div>
);

export default InfoBar;
