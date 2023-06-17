import Chat from "../Chat/Chat";
import ChatInput from "../ChatInput/ChatInput";
import axios from "axios";
import React, { useState, useEffect } from "react";
import "./chat-display.css";
import MessageService from "../../MessageService";

interface User {
  _id: string;
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
  user: User;
  clickedUser: User;
}

const ChatDisplay: React.FC<ChatDisplayProps> = ({ user, clickedUser }) => {
  const userId = user?._id;
  const clickedUserId = clickedUser?._id;
  const [usersMessages, setUsersMessages] = useState<Message[]>([]);
  const [clickedUsersMessages, setClickedUsersMessages] = useState<Message[]>(
    []
  );

  const getUsersMessages = async () => {
    try {
      const response = await MessageService.getMsg(userId, clickedUserId);
      setUsersMessages(response.data);
      console.log(usersMessages);
      // const response = await axios.get("http://localhost:3000/messages", {
      //   params: { userId: userId, correspondingUserId: clickedUserId },
      // });
    } catch (error) {
      console.log(error);
    }
  };

  const getClickedUsersMessages = async () => {
    try {
      const response = await MessageService.getMsg(clickedUserId, userId);
      setClickedUsersMessages(response.data);
      console.log(clickedUsersMessages);
      // const response = await axios.get("http://localhost:3000/messages", {
      //   params: { userId: clickedUserId, correspondingUserId: userId },
      // });
      // setClickedUsersMessages(response.data);
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
        setUsersMessages={setUsersMessages}
        setClickedUSerMessages={setClickedUsersMessages}
      />
    </>
  );
};

export default ChatDisplay;
