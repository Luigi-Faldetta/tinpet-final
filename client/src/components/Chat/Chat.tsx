import React from "react";
import "./chat.css";
import { User } from "../ChatDisplay/ChatDisplay";

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
  user: User;
  clickedUserId: String;
  userId: string;
}

const Chat: React.FC<ChatProps> = ({
  descendingOrderMessages,
  user,
  clickedUserId,
  userId,
}) => {
  console.log(clickedUserId, "clicked");
  console.log(user._id, "user", userId);
  return (
    <>
      <div className='chat-display'>
        {descendingOrderMessages.map((message, index) => (
          <div
            className={`message ${
              message.fromUser === user.ownerName ? "message" : "incoming"
            }`}
            key={index}
          >
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
