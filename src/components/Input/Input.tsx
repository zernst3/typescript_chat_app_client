import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import Fade from "react-reveal/Fade";
import Words from "../translation";
import "./Input.css";

const Input: React.FC<any> = ({
  message,
  setMessage,
  sendMessage,
  language,
}) => {
  const [isEmoji, setIsEmoji] = useState<boolean>(false);

  const onEmojiClick = (evt: any, emojiObject: any) => {
    setMessage(message + emojiObject.emoji);
  };

  const emojiClick = (evt: any) => {
    evt.preventDefault();
    evt.target.name === "textarea" ? setIsEmoji(false) : setIsEmoji(!isEmoji);
  };

  return (
    <div id="input">
      <form>
        {isEmoji && (
          <Fade duration={500}>
            <EmojiPicker onEmojiClick={onEmojiClick} />
          </Fade>
        )}
        <button onClick={(evt) => emojiClick(evt)}>😁</button>
        <textarea
          name="textarea"
          onClick={(evt) => emojiClick(evt)}
          rows={4}
          value={message}
          placeholder={Words[language].typeInAMessage}
          onChange={(evt) => setMessage(evt.target.value)}
          onKeyPress={(evt) => (evt.key === "Enter" ? sendMessage(evt) : null)}
        ></textarea>

        <button
          className="sendMessageButton"
          disabled={!message}
          onClick={(evt) => sendMessage(evt)}
        >
          {Words[language].send}
        </button>
      </form>
    </div>
  );
};

export default Input;
