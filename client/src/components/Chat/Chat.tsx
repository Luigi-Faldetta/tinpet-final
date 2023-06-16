import React from "react";
import "./chat.css";

interface Message {
  name: string;
  img: string;
  message: string;
}

interface ChatProps {
  descendingOrderMessages: Message[];
}

const Chat: React.FC<ChatProps> = ({ descendingOrderMessages }) => {
  return (
    <>
      <div className="chat-display">
        {descendingOrderMessages.map((message, index) => (
          <div key={index}>
            <div>
              <div className="img-container">
                <img src={message.img} alt={`${message.name} profile`} />
              </div>
              <p>{message.name}</p>
            </div>
            <p>{message.message}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Chat;