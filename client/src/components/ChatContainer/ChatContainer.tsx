import React, { useState } from "react";
import ChatDisplay from "../ChatDisplay/ChatDisplay";
import MatchesDisplay from "../MatchesDisplay/MatchesDisplay";
import ChatHeader from "../ChatHeader/ChatHeader";
import "./chat-container.css";

interface User {
  _id: string;
  ownerName: string;
  dogName: string;
  matches: User[];
  avatar: string;
}

interface ChatContainerProps {
  currentUser: User;
}

const ChatContainer: React.FC<ChatContainerProps> = ({ currentUser }) => {
  const [clickedUser, setClickedUser] = useState<User | null>(null);

  const handleSetClickedUser = (user: User) => {
    setClickedUser(user);
  };

  return (
    <div className="chat-container">
      <ChatHeader user={currentUser} />
      <div>
        <button className="option" onClick={() => setClickedUser(null)}>
          Matches
        </button>

        <button className="option" disabled={!clickedUser}>
          Chat
        </button>
      </div>

      {!clickedUser && (
        <MatchesDisplay
          matches={currentUser.matches}
          setClickedUser={handleSetClickedUser}
        />
      )}
      {clickedUser && (
        <ChatDisplay user={currentUser} clickedUser={clickedUser} />
      )}
    </div>
  );
};

export default ChatContainer;
