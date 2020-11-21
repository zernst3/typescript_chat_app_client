import React from "react";
import Words from "../translation";
import "./Users.css";

const Users: React.FC<any> = ({ users, language }) => (
  <div id="users">
    <h2>{Words[language].usersInChatRoom}</h2>
    {users.map((user: string, idx: number) => {
      return (
        <p key={idx}>
          <img
            src="https://www.pngkey.com/png/full/506-5060011_bubble-green.png"
            alt="online"
          />
          {user}
        </p>
      );
    })}
  </div>
);

export default Users;
