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
    const message = {
      timestamp: new Date().toISOString(),
      from_userId: userId,
      to_userId: clickedUserId,
      message: textArea,
    };

    try {
      // await axios.post("http://localhost:3000/message", { message });
      const response = await MessageService.postMsg(
        message.message,
        userId,
        clickedUserId
      );
      // console.log(response);

      // setUsersMessages(messageToDisplayUser);
      // setClickedUSerMessages(messageToDisplayClickedUser);
      getUserMessages();
      getClickedUsersMessages();
      setTextArea("");

      console.log(message.message);
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
