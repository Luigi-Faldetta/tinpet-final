import CloseIcon from "@mui/icons-material/Close";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import "./auth-modal.css";
import UserService from "../../Services/UserService";

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
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [cookies, setCookie, removeCookie] = useCookies([
    "AuthToken",
    "UserId",
  ]);

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

      const response = await UserService.postUser(
        email,
        password,
        isSignUp
      ).then((response) => {

        const success = response.status === 201;

        if (success && isSignUp) {
          const token = response.data.token;
          const userId = response.data.data;
          setCookie("UserId", userId);
          setCookie("AuthToken", token);
          navigate("/onboarding");
        }
        if (success && !isSignUp) {
          const token = response.data.token;
          const userId = response.data.userId;
          setCookie("UserId", userId);
          setCookie("AuthToken", token);
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
