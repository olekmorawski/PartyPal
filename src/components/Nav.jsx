import whitelogo from "/styles/images/logo_white_letters.png";
import colorlogo from "/styles/images/logo_color_letters.png";

const Nav = ({ authToken, minimal, setShowModal, showModal, setIsSignUp }) => {

  const handleClick = () => {
    setShowModal(true)
    setIsSignUp(false)
  }

  return (
    <nav>
      <div className="logo_container">
        <img
          className="logo"
          src={minimal ? colorlogo : whitelogo}
          alt="PartyPal logo"
        />
      </div>
      {!authToken && !minimal && (
        <button className="btn-nav" onClick={handleClick} disabled={showModal}>
          Log in
        </button>
      )}
      {authToken && (
        <button className="btn-nav" onClick={handleClick}>
          Logout
        </button>
      )}
    </nav>
  );
};

export default Nav;
