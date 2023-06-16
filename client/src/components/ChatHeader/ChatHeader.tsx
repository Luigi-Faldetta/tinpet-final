//ChatHeader.tsx
import React from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import "./chat-header.css";

interface User {
  ownerName: string;
  dogName: string;
  avatar: string;
}

interface ChatHeaderProps {
  user: User;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ user }) => {
  const [cookies, setCookie, removeCookie] = useCookies([
    "UserId",
    "AuthToken",
  ]);
  const navigate = useNavigate();

  const logout = () => {
    removeCookie("UserId", cookies.UserId);
    removeCookie("AuthToken", cookies.AuthToken);
    navigate("/");
  };

  return (
    <div className="chat-container-header">
      <div className="profile">
        <div className="img-container">
          <img src={user.avatar} alt="user photo" />
        </div>
        <h3>{user.ownerName}</h3>
      </div>
      <i className="logout-icon" onClick={logout}>
        <LogoutIcon />
      </i>
    </div>
  );
};

export default ChatHeader;
