import whitelogo from "/styles/images/logo_white_letters.png";
import colorlogo from "/styles/images/logo_color_letters.png";

const Nav = ({ minimal, authToken, setShowModal, showModal, setIsSignUp }) => {
  const handleClick = () => {
    setShowModal(true);
    setIsSignUp(false);
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
      {!authToken && (
        <button className="btn-nav" onClick={handleClick} disabled={showModal}>
          Log in
        </button>
      )}
    </nav>
  );
};
export default Nav;
