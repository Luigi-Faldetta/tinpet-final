/* eslint-disable react/prop-types */

import logo from "../../assets/dog-face-svgrepo-com.svg";

import "./nav.css";
import React, { useState } from "react";

interface NavProps {
  setShowModal: (showModal: boolean) => void;
  showModal: boolean;
  setIsSignUp: (isSignUp: boolean) => void;
  authToken: boolean;
}

const Nav: React.FC<NavProps> = ({
  setShowModal,
  showModal,
  setIsSignUp,
  authToken,
}) => {
  const handleClick = () => {
    setShowModal(true);
    setIsSignUp(false);
  };

  return (
    <nav>
      <div className="logo-container">
        <img className="logo" src={logo} alt="Logo" />
      </div>
      {!authToken && (
        <button className="btn-nav" onClick={handleClick} disabled={showModal}>
          Log In
        </button>
      )}
    </nav>
  );
};

export default Nav;
