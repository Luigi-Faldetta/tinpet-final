import axios from "axios";
import React, { useEffect, useState } from "react";
import "./matches-display.css";

interface User {
  _id: string;
  ownerName: string;
  avatar: string;
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
      const response = await axios.get("http://localhost:3000/matchedusers", {
        params: { userIds: JSON.stringify(matchedUserIds) },
      });
      setMatchedProfiles(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getMatches();
  }, [matches]);

  return (
    <div className="matches-display">
      {matchedProfiles?.map((match) => (
        <div
          key={match._id}
          className="match-card"
          onClick={() => setClickedUser(match)}
        >
          <div className="img-container">
            <img src={match?.avatar} alt="matched photo" />
          </div>
          <h3>{match?.ownerName}</h3>
        </div>
      ))}
    </div>
  );
};

export default MatchesDisplay;
