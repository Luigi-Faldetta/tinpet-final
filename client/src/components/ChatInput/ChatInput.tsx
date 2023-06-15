/* eslint-disable react/prop-types */

import React, { useState } from "react";
import axios from "axios";
import "./chat-input.css";

interface User {
  user_id: string;
}

interface ChatInputProps {
  user: User | null;
  clickedUser: User | null;
  getUserMessages: () => void;
  getClickedUsersMessages: () => void;
}

const ChatInput: React.FC<ChatInputProps> = ({
  user,
  clickedUser,
  getUserMessages,
  getClickedUsersMessages,
}) => {
  const [textArea, setTextArea] = useState("");
  const userId = user?.user_id;
  const clickedUserId = clickedUser?.user_id;

  const addMessage = async () => {
    const message = {
      timestamp: new Date().toISOString(),
      from_userId: userId,
      to_userId: clickedUserId,
      message: textArea,
    };

    try {
      await axios.post("http://localhost:3000/message", { message });
      getUserMessages();
      getClickedUsersMessages();
      setTextArea("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="chat-input">
      <textarea
        value={textArea}
        onChange={(e) => setTextArea(e.target.value)}
      ></textarea>
      <button className="btn-secondary" onClick={addMessage}>
        Submit
      </button>
    </div>
  );
};

export default ChatInput;
