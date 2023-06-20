import React, { useState } from "react";
import axios from "axios";
import "./chat-input.css";
import MessageService from "../../Services/MessageService";

interface User {
  _id: string;
  avatar: string;
  ownerName: string;
}

interface Message {
  // message: string;
  // timestamp: string;
  // img: string;
  // ownerName: string;
  fromUser: string;
  message: string;
  time: string;
  toUser: string;
}

interface ChatInputProps {
  user: User;
  clickedUser: User;
  getUserMessages: () => void;
  getClickedUsersMessages: () => void;
  setUsersMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  setClickedUSerMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

const ChatInput: React.FC<ChatInputProps> = ({
  user,
  clickedUser,
  getUserMessages,
  getClickedUsersMessages,
  setUsersMessages,
  setClickedUSerMessages,
}) => {
  const [textArea, setTextArea] = useState("");
  const userId = user._id;
  const clickedUserId = clickedUser._id;

  const addMessage = async () => {
    if (textArea === "") return;
    const message = {
      timestamp: new Date().toISOString(),
      from_userId: userId,
      to_userId: clickedUserId,
      message: textArea,
    };
    try {
      const response = await MessageService.postMsg(
        message.message,
        message.timestamp,
        userId,
        clickedUserId
      );

      getUserMessages();
      getClickedUsersMessages();
      setTextArea("");
    } catch (error) {
      console.log(error);
    }
  };
  const handleKeyDown = (e: { key: string; preventDefault: () => void }) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addMessage();
    }
  };
  return (
    <div className='chat-input'>
      <textarea
        value={textArea}
        onChange={(e) => setTextArea(e.target.value)}
        onKeyDown={handleKeyDown}
      ></textarea>
      <button className='btn-secondary' onClick={addMessage}>
        Submit
      </button>
    </div>
  );
};

export default ChatInput;
