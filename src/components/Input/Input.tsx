import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import "./Input.css";

const Input: React.FC<any> = ({ message, setMessage, sendMessage }) => {
  const [isEmoji, setIsEmoji] = useState<boolean>(false);

  const onEmojiClick = (evt: any, emojiObject: any) => {
    setMessage(message + emojiObject.emoji);
  };

  const emojiClick = (evt: any) => {
    evt.preventDefault();
    setIsEmoji(!isEmoji);
  };

  return (
    <div id="input">
      <form>
        {isEmoji && <EmojiPicker onEmojiClick={onEmojiClick} />}
        <button onClick={(evt) => emojiClick(evt)}>😁</button>
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
};

export default Input;
