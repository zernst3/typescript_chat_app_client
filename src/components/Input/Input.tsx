import React from "react";
import "./Input.css";

const Input: React.FC<any> = ({ message, setMessage, sendMessage }) => (
  <div id="input">
    <form>
      <textarea
        rows={4}
        value={message}
        placeholder="Type in a message..."
        onChange={(evt) => setMessage(evt.target.value)}
        onKeyPress={(evt) => (evt.key === "Enter" ? sendMessage(evt) : null)}
      ></textarea>
      <button
        className="sendMessageButton"
        disabled={!message}
        onClick={(evt) => sendMessage(evt)}
      >
        Send
      </button>
    </form>
  </div>
);

export default Input;
