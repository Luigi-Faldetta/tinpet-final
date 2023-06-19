import Chat from "../Chat/Chat";
import ChatInput from "../ChatInput/ChatInput";
import axios from "axios";
import React, { useState, useEffect } from "react";
import "./chat-display.css";
import MessageService from "../../Services/MessageService";

interface User {
  _id: string;
  ownerName: string;
  avatar: string;
}

interface Message {
  fromUser: string;
  message: string;
  time: string;
  toUser: string;
  // img: string;
  // ownerName: string;
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
      // const response = await axios.get("http://localhost:3000/messages", {
      //   params: { userId: userId, correspondingUserId: clickedUserId },
      // });
    } catch (error) {
      console.log(error);
    }
  };
  console.log(usersMessages, "user message are empty");

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
    // ownerName: string;
    // img: string;
    // message: string;
    // timestamp: string;
    fromUser: string;
    message: string;
    time: string;
    toUser: string;
  }[] = [];

  usersMessages?.forEach((message) => {
    const formattedMessage = {
      // ownerName: user?.ownerName || "",
      // img: user?.avatar || "",
      // message: message.message,
      // timestamp: message.time,
      fromUser: user?.ownerName,
      message: message.message,
      time: message.time,
      toUser: clickedUser.ownerName,
    };
    messages.push(formattedMessage);
  });

  clickedUsersMessages?.forEach((message) => {
    const formattedMessage = {
      fromUser: user?.ownerName || "",
      // img: clickedUser?.avatar || "",
      message: message.message,
      time: message.time,
      toUser: clickedUser.ownerName || "",
    };
    messages.push(formattedMessage);
  });

  const descendingOrderMessages = messages?.sort((a, b) =>
    a.time.localeCompare(b.time)
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
