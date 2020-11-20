import React from "react";

const Input: React.FC<any> = ({ message, setMessage, sendMessage }) => (
  <div id="input">
    <form>
      <input
        type="text"
        placeholder="Type in a message..."
        value={message}
        onChange={(evt) => setMessage(evt.target.value)}
        onKeyPress={(evt) => (evt.key === "Enter" ? sendMessage(evt) : null)}
      />
      <button className="sendMessageButton" onClick={(evt) => sendMessage(evt)}>
        Send
      </button>
    </form>
  </div>
);

export default Input;
