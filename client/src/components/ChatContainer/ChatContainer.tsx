import React, { useState } from "react";
import ChatDisplay from "../ChatDisplay/ChatDisplay";
import MatchesDisplay from "../MatchesDisplay/MatchesDisplay";
import ChatHeader from "../ChatHeader/ChatHeader";
import "./chat-container.css";
import { UserInterface } from "../../interfaces";

interface ChatContainerProps {
  currentUser: UserInterface;
  userId: string;
}

const ChatContainer: React.FC<ChatContainerProps> = ({
  currentUser,
  userId,
}) => {
  const [clickedUser, setClickedUser] = useState<UserInterface | null>(null);

  const handleSetClickedUser = (user: UserInterface) => {
    setClickedUser(user);
  };

  return (
    <div className='chat-container'>
      <ChatHeader user={currentUser} />
      <div>
        <button className='option' onClick={() => setClickedUser(null)}>
          Matches
        </button>

        <button className='option' disabled={!clickedUser}>
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
        <ChatDisplay
          user={currentUser}
          clickedUser={clickedUser}
          userId={userId}
        />
      )}
    </div>
  );
};

export default ChatContainer;
