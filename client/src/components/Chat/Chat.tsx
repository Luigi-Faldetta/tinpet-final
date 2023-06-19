import React from "react";
import "./chat.css";

interface Message {
  // ownerName: string;
  // img: string;
  // message: string;
  fromUser: string;
  message: string;
  time: string;
  toUser: string;
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
              {/* <div className="img-container">
                <img src={message.img} alt={`${message.fromUser} profile`} />
              </div> */}
              <p>{message.fromUser}</p>
            </div>
            <p>{message.message}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Chat;
