import Nav from "../components/Nav";
import AuthModal from "../components/AuthModal";
import { useState } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);

  const isLoggedIn = useStoreState((state) => state.auth.isLoggedIn);

  const handleClick = () => {
    console.log("clicked");
    setShowModal(true);
    setIsSignUp(!isLoggedIn); // Toggle between login and sign up
  };

  return (
    <>
      <div className="overlay">
        <Nav
          minimal={false}
          setShowModal={setShowModal}
          showModal={showModal}
          setIsSignUp={setIsSignUp}
        />
        <div className="home">
          <h1 className="title_primary">Have a Party!</h1>
          <button className="btn-primary" onClick={handleClick}>
            {isLoggedIn ? "Sign out" : "Create Account"}
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
