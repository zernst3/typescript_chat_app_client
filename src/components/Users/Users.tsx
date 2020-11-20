import React from "react";
import "./Users.css";

const Users: React.FC<any> = ({ users }) => (
  <div id="users">
    <h2>Users in Chat Room</h2>
    {users.map((user: string, idx: number) => {
      return <p key={idx}>{user}</p>;
    })}
  </div>
);

export default Users;
