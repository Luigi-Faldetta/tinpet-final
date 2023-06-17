import Chat from "../Chat/Chat";
import ChatInput from "../ChatInput/ChatInput";
import axios from "axios";
import React, { useState, useEffect } from "react";
import "./chat-display.css";

interface User {
  user_id: string;
  ownerName: string;
  avatar: string;
}

interface Message {
  message: string;
  timestamp: string;
  img: string;
  ownerName: string;
}

interface ChatDisplayProps {
  user: User | null;
  clickedUser: User | null;
}

const ChatDisplay: React.FC<ChatDisplayProps> = ({ user, clickedUser }) => {
  const userId = user?.user_id;
  const clickedUserId = clickedUser?.user_id;
  const [usersMessages, setUsersMessages] = useState<Message[] | null>(null);
  const [clickedUsersMessages, setClickedUsersMessages] = useState<
    Message[] | null
  >(null);

  const getUsersMessages = async () => {
    try {
      const response = await axios.get("http://localhost:3000/messages", {
        params: { userId: userId, correspondingUserId: clickedUserId },
      });
      setUsersMessages(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getClickedUsersMessages = async () => {
    try {
      const response = await axios.get("http://localhost:3000/messages", {
        params: { userId: clickedUserId, correspondingUserId: userId },
      });
      setClickedUsersMessages(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsersMessages();
    getClickedUsersMessages();
  }, []);

  const messages: {
    ownerName: string;
    img: string;
    message: string;
    timestamp: string;
  }[] = [];

  usersMessages?.forEach((message) => {
    const formattedMessage = {
      ownerName: user?.ownerName || "",
      img: user?.avatar || "",
      message: message.message,
      timestamp: message.timestamp,
    };
    messages.push(formattedMessage);
  });

  clickedUsersMessages?.forEach((message) => {
    const formattedMessage = {
      ownerName: clickedUser?.ownerName || "",
      img: clickedUser?.avatar || "",
      message: message.message,
      timestamp: message.timestamp,
    };
    messages.push(formattedMessage);
  });

  const descendingOrderMessages = messages?.sort((a, b) =>
    a.timestamp.localeCompare(b.timestamp)
  );

  return (
    <>
      <Chat descendingOrderMessages={descendingOrderMessages} />
      <ChatInput
        user={user}
        clickedUser={clickedUser}
        getUserMessages={getUsersMessages}
        getClickedUsersMessages={getClickedUsersMessages}
      />
    </>
  );
};

export default ChatDisplay;
