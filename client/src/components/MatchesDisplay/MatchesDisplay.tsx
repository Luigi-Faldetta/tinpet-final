import axios from "axios";
import React, { useEffect, useState } from "react";
import "./matches-display.css";
import UserService from "../../Services/UserService";

interface User {
  _id: string;
  ownerName: string;
  avatar: string;
  dogName: string;
  matches: User[];
}

interface MatchesDisplayProps {
  matches: User[];
  setClickedUser: (user: User) => void;
}

const MatchesDisplay: React.FC<MatchesDisplayProps> = ({
  matches,
  setClickedUser,
}) => {
  const [matchedProfiles, setMatchedProfiles] = useState<User[] | null>(null);

  const getMatches = async () => {
    const matchedUserIds = matches.map(({ _id }) => _id);
    try {
      const response = await UserService.getMatchedUsers(matchedUserIds);
      setMatchedProfiles(response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getMatches();
  }, [matches]);
  return (
    <div className='matches-display'>
      {matchedProfiles?.map((match) => (
        <div
          key={match._id}
          className='match-card'
          onClick={() => setClickedUser(match)}
        >
          <div className='img-container'>
            <img src={match?.avatar} alt='matched photo' />
          </div>
          <h3>{match?.ownerName}</h3>
        </div>
      ))}
    </div>
  );
};

export default MatchesDisplay;
