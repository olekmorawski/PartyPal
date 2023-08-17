import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useStoreActions } from "easy-peasy";
import axios from "axios";

const AuthModal = ({ setShowModal, isSignUp }) => {
  const setIsLoggedIn = useStoreActions(
    (actions) => actions.auth.setIsLoggedIn
  );
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [error, setError] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies("user");

  let navigate = useNavigate();

  const handleClick = () => {
    setShowModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignUp && password !== confirmPassword) {
        setError("Passwords are not identical!");
        return;
      }
      console.log("posting", email, password);
      const response = await axios.post(
        `http://localhost:8000/${isSignUp ? "signup" : "login"}`,
        {
          email,
          password,
        }
      );

      setCookie("AuthToken", response.data.token);
      setCookie("UserId", response.data.user_id);

      const success = response.status == 201;

      if (success && isSignUp) navigate("/onboarding");
      if (success && !isSignUp) navigate("/dashboard");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="auth_modal">
      <div className="close_icon" onClick={handleClick}>
        X
      </div>
      <h2>{isSignUp ? "Create Account" : "Log In"}</h2>
      <p>By clicking log in you agree to start this react app.</p>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="email"
          required={true}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="password"
          required={true}
          onChange={(e) => setPassword(e.target.value)}
        />
        {isSignUp && (
          <input
            type="password"
            name="password-check"
            id="password-check"
            placeholder="confirm password"
            required={true}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        )}
        <input className="btn-secondary" type="submit" />
        <p>{error}</p>
      </form>
    </div>
  );
};

export default AuthModal;
