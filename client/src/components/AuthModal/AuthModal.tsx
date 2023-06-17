//@ts-nocheck

import CloseIcon from "@mui/icons-material/Close";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import "./auth-modal.css";

interface AuthModalProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  isSignUp: boolean;
}

const AuthModal: React.FC<AuthModalProps> = ({
  setShowModal,
  isSignUp,
}: {
  setShowModal: (value: boolean) => void;
  isSignUp: boolean;
}) => {
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [confirmPassword, setConfirmPassword] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [cookies, setCookie, removeCookie] = useCookies(null);

  const navigate = useNavigate();

  const handleClick = () => {
    setShowModal(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (isSignUp && password !== confirmPassword) {
        setError("Passwords needs to match!");
        return;
      }
      console.log(email, password);
      const response = await axios
        .post(`http://localhost:3000/${isSignUp ? "signup" : "login"}`, {
          email,
          password,
        })
        .then((response) => {
          const token = response.data.token;
          const userId = response.data.id;
          setCookie("UserId", userId);
          setCookie("AuthToken", token);
          const success = response.status === 201;

          if (success && isSignUp) {
            console.log(response.data);
            navigate("/onboarding");
          }
          if (success && !isSignUp) {
            console.log(response.data);
            navigate("/dashboard");
          }

          window.location.reload();
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="auth-modal">
      <div onClick={handleClick}>
        <CloseIcon className="close-icon" />
      </div>
      <h2>{isSignUp ? "CREATE AN ACCOUNT" : "LOG IN"}</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="email"
          required={true}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          id="password"
          name="password"
          placeholder="password"
          required={true}
          onChange={(e) => setPassword(e.target.value)}
        />

        {isSignUp && (
          <input
            type="password"
            id="password-check"
            name="password-check"
            placeholder="confirm your password"
            required={true}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        )}

        <input type="submit" className="btn-secondary" />
        <p>{error}</p>
      </form>
      <hr />
      <h2>GET THE APP</h2>
    </div>
  );
};

export default AuthModal;
