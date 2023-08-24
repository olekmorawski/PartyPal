import { useCookies } from "react-cookie";
import whitelogo from "/styles/images/logo_white_letters.png";
import colorlogo from "/styles/images/logo_color_letters.png";

const Nav = ({ authToken, minimal, setShowModal, showModal, setIsSignUp }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  const handleLogout = () => {
    removeCookie("UserId", cookies.UserId);
    removeCookie("AuthToken", cookies.AuthToken);
    window.location.reload();
  };
  const handleClick = () => {
    if (authToken) {
      handleLogout();
      return;
    }
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
      {!authToken && !minimal && (
        <button className="btn-nav" onClick={handleClick} disabled={showModal}>
          Log in
        </button>
      )}
      {authToken && (
        <button className="btn-nav" onClick={handleLogout}>
          Logout
        </button>
      )}
    </nav>
  );
};

export default Nav;
