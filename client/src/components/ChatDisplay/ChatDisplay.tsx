import Chat from "../Chat/Chat";
import ChatInput from "../ChatInput/ChatInput";
import React, { useState, useEffect } from "react";
import "./chat-display.css";
import MessageService from "../../Services/MessageService";
import { Message, UserInterface } from "../../interfaces";

interface ChatDisplayProps {
  user: UserInterface;
  clickedUser: UserInterface;
  userId: string;
}

const ChatDisplay: React.FC<ChatDisplayProps> = ({
  user,
  clickedUser,
  userId,
}) => {
  const clickedUserId = clickedUser?._id;
  const [usersMessages, setUsersMessages] = useState<Message[]>([]);
  const [clickedUsersMessages, setClickedUsersMessages] = useState<Message[]>(
    []
  );

  const getUsersMessages = async () => {
    try {
      const response = await MessageService.getMsg(userId, clickedUserId);
      setUsersMessages(response.data);
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
  useEffect(() => {
    getUsersMessages();
    getClickedUsersMessages();
    return () => {};
  }, []);

  const messages: {
    fromUser: string;
    message: string;
    time: string;
    toUser: string;
  }[] = [];

  usersMessages?.forEach((message) => {
    const formattedMessage = {
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
