import React, { useEffect, useState } from "react";
import axios from "axios";
import "./chat-input.css";
import MessageService, { socket } from "../../Services/MessageService";
import io from "socket.io-client";
import { Message } from "../ChatDisplay/ChatDisplay";

// const socket = io("http://localhost:3000");

interface User {
  _id: string;
  avatar: string;
  ownerName: string;
}

interface ChatInputProps {
  user: User;
  clickedUser: User;
  getUserMessages: () => void;
  getClickedUsersMessages: () => void;
  setUsersMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  setClickedUSerMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  usersMessages: Message[];
  clickedUsersMessages: Message[];
}

const ChatInput: React.FC<ChatInputProps> = ({
  user,
  clickedUser,
  getUserMessages,
  getClickedUsersMessages,
  setUsersMessages,
  setClickedUSerMessages,
  usersMessages,
  clickedUsersMessages,
}) => {
  const [textArea, setTextArea] = useState("");
  const userId = user._id;
  const clickedUserId = clickedUser._id;

  const addMessage = async () => {
    if (textArea === "") return;
    const message = {
      time: new Date().toISOString(),
      fromUser: userId,
      toUser: clickedUserId,
      message: textArea,
    };
    try {
      const response = await MessageService.postMsg(
        message.message,
        message.time,
        userId,
        clickedUserId
      );

      // getUserMessages();
      // getClickedUsersMessages();
      const updatedUserMessages = [...usersMessages, message];
      setUsersMessages(updatedUserMessages);
      socket.emit("newMessage", { userId: userId, message });
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
  socket.on("newMessage", (message) => {
    getUserMessages();
    getClickedUsersMessages();
  });
  // useEffect(() => {
  // }, []);
  return (
    <div className='chat-input'>
      <textarea
        value={textArea}
        onChange={(e) => setTextArea(e.target.value)}
        onKeyDown={handleKeyDown}
      ></textarea>
      <button
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl mt-5'
        onClick={addMessage}
      >
        Submit
      </button>
    </div>
  );
};

export default ChatInput;
