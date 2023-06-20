import Chat from "../Chat/Chat";
import ChatInput from "../ChatInput/ChatInput";
import axios from "axios";
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "./chat-display.css";
// const socket = io("http://localhost:3000");
import MessageService from "../../Services/MessageService";

export interface User {
  _id: string;
  ownerName: string;
  avatar: string;
}

export interface Message {
  fromUser: string;
  message: string;
  time: string;
  toUser: string;
}

interface ChatDisplayProps {
  user: User;
  clickedUser: User;
  userId: string;
}

const ChatDisplay: React.FC<ChatDisplayProps> = ({
  user,
  clickedUser,
  userId,
}) => {
  // const userId = user?._id;
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

  const getClickedUsersMessages = async () => {
    try {
      const response = await MessageService.getMsg(clickedUserId, userId);
      setClickedUsersMessages(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(clickedUserId, "here");
  useEffect(() => {
    getUsersMessages();
    getClickedUsersMessages();
    // socket.on("newMessage", () => {
    //   getUsersMessages();
    //   getClickedUsersMessages();
    // });
    return () => {
      // socket.off("newMessage");
    };
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
      fromUser: user.ownerName,
      message: message.message,
      time: message.time,
      toUser: clickedUser.ownerName,
    };
    messages.push(formattedMessage);
  });

  clickedUsersMessages?.forEach((message) => {
    const formattedMessage = {
      fromUser: clickedUser?.ownerName || "",
      // img: clickedUser?.avatar || "",
      message: message.message,
      time: message.time,
      toUser: user.ownerName || "",
    };
    messages.push(formattedMessage);
  });

  const descendingOrderMessages = messages?.sort((a, b) =>
    a.time.localeCompare(b.time)
  );

  return (
    <div>
      <div className='msg'>
        <Chat
          descendingOrderMessages={descendingOrderMessages}
          user={user}
          clickedUserId={clickedUserId}
          userId={userId}
        />
      </div>
      <ChatInput
        user={user}
        clickedUser={clickedUser}
        getUserMessages={getUsersMessages}
        getClickedUsersMessages={getClickedUsersMessages}
        setUsersMessages={setUsersMessages}
        usersMessages={usersMessages}
        setClickedUSerMessages={setClickedUsersMessages}
        clickedUsersMessages={clickedUsersMessages}
      />
    </div>
  );
};

export default ChatDisplay;
