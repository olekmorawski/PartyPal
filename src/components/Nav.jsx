import { useStoreState, useStoreActions } from "easy-peasy";
import whitelogo from "/styles/images/logo_white_letters.png";
import colorlogo from "/styles/images/logo_color_letters.png";

const Nav = ({ minimal, setShowModal, showModal, setIsSignUp }) => {
  const isLoggedIn = useStoreState((state) => state.auth.isLoggedIn);
  const setIsLoggedIn = useStoreActions(
    (actions) => actions.auth.setIsLoggedIn
  );

  const handleClick = () => {
    if (!isLoggedIn) {
      setShowModal(true);
      setIsSignUp(false);
    } else {
      setIsLoggedIn(false);
    }
  };

  return (
    <nav>
      <div className="logo_container">
        <img
          className="logo"
          src={minimal ? colorlogo : whitelogo}
          alt="PartyPal logo"
        />
      </div>
      {!isLoggedIn && !minimal && (
        <button className="btn-nav" onClick={handleClick} disabled={showModal}>
          Log in
        </button>
      )}
      {isLoggedIn && (
        <button className="btn-nav" onClick={handleClick}>
          Logout
        </button>
      )}
    </nav>
  );
};

export default Nav;
