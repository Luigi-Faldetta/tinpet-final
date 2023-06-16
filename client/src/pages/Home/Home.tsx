import React, { useState } from "react";
import AuthModal from "../../components/AuthModal/AuthModal";
import Nav from "../../components/Nav/Nav";
import "./home.css";

const Home: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isSignUp, setIsSignUp] = useState<boolean>(true);

  const authToken: boolean = false;

  const handleClick = () => {
    console.log("Click!!");
    setShowModal(true);
    setIsSignUp(true);
  };

  return (
    <>
      <div className="overlay">
        <Nav
          setShowModal={setShowModal}
          showModal={showModal}
          setIsSignUp={setIsSignUp}
          authToken={authToken}
        />
        <div className="home">
          <h1 className="primary-title">TinPet</h1>
          <p>
            Your pet is lonely and has no friends? TinPet is the solution, here
            you can contact other people who are also looking for friends for
            their pets, where you can make friends .... among other things...
          </p>
          <button className="btn-primary" onClick={handleClick}>
            {authToken ? "Sign Out" : "Create Account"}
          </button>

          {showModal && (
            <AuthModal setShowModal={setShowModal} isSignUp={isSignUp} />
          )}
        </div>
      </div>
    </>
  );
};

export default Home;