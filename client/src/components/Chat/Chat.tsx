import React, { useEffect, useRef } from "react";
import "./chat.css";
import moment from "moment";
import { Message, UserInterface } from "../../interfaces";

interface ChatProps {
  descendingOrderMessages: Message[];
  user: UserInterface;
  clickedUserId: String;
  userId: string;
}

const Chat: React.FC<ChatProps> = ({ descendingOrderMessages, user }) => {
  const chatRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [descendingOrderMessages.length]);
  return (
    <>
      <div className='chat-display' ref={chatRef}>
        {descendingOrderMessages.map((message, index) => (
          <div
            className={`message ${
              message.fromUser === user.ownerName ? "message" : "incoming"
            }`}
            key={index}
          >
            <div>
              <div className='senderName'>{message.fromUser}</div>
            </div>
            <div className='content'>
              <p>{message.message}</p>
            </div>
            <div className='time'>
              <p>{moment(message.time).calendar()}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Chat;
