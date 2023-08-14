import { useState } from "react";
const AuthModal = ({ setShowModal, isSignUp }) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [error, setError] = useState(null);


  const handleClick = () => {
    setShowModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (isSignUp && password !== confirmPassword) {
        setError("Passwords are not identical!");
      }
      console.log("make a post request to our database");
    } catch (error) {
      console.error("Error:", error);
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
        {isSignUp && <input
          type="password"
          name="password-check"
          id="password-check"
          placeholder="confirm password"
          required={true}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />}
        <input className="btn-secondary" type="submit" />
        <p>{error}</p>
      </form>
    </div>
  );
};

export default AuthModal;
