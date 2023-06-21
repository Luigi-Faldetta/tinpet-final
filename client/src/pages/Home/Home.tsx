import React, { useState } from "react";
import AuthModal from "../../components/AuthModal/AuthModal";
import Nav from "../../components/Nav/Nav";
import "./home.css";

const Home: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isSignUp, setIsSignUp] = useState<boolean>(true);

  const authToken: boolean = false;

  const handleClick = () => {
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
            Your dog is lonely and has no friends? TinPet is the solution! Here,
            you can connect with like-minded dog owners who are also looking for
            companionship and opportunities to go on walks together. Make new
            friends for your furry pals and enjoy the company of other dog
            lovers. Join TinPet today and start creating meaningful connections
            in your local dog community.
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
