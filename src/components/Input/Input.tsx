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
    evt.target.name === "textarea" || evt.target.name === "send"
      ? setIsEmoji(false)
      : setIsEmoji(!isEmoji);
  };

  return (
    <div id="input">
      {isEmoji && (
        <Fade duration={500}>
          <EmojiPicker onEmojiClick={onEmojiClick} />
        </Fade>
      )}
      <Fade duration={500}>
        <form>
          <textarea
            name="textarea"
            onClick={(evt) => emojiClick(evt)}
            rows={2}
            value={message}
            placeholder={Words[language].typeInAMessage}
            onChange={(evt) => setMessage(evt.target.value)}
            onKeyPress={(evt) =>
              evt.key === "Enter" ? sendMessage(evt) : null
            }
          ></textarea>
          <div>
            <button onClick={(evt) => emojiClick(evt)}>😁</button>
            <button
              name="send"
              className="sendMessageButton"
              disabled={!message}
              onClick={(evt) => {
                emojiClick(evt);
                sendMessage(evt);
              }}
            >
              {Words[language].send}
            </button>
          </div>
        </form>
      </Fade>
    </div>
  );
};

export default Input;
