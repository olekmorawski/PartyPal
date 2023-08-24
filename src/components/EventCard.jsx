import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

const EventCard = ({ title, url, eventId }) => {
  const [isStarSelected, setIsStarSelected] = useState(false);

  const navigate = useNavigate();
  return (
    <div
      className="event"
      style={{
        backgroundImage: `url(${url})`,
        backgroundSize: `cover`,
        backgroundPosition: `center`,
      }}
    >
      <div className="up">
        <button
          onClick={() => setIsStarSelected(!isStarSelected)}
          className={`star_button ${isStarSelected ? "selected" : ""}`}
          style={{
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
          }}
        >
          <img
            className="star-icon"
            src="styles/images/star.svg"
            alt="Star"
            width="24px"
            height="24px"
          />
        </button>
        <p style={{ fontSize: `18px` }}>{title}</p>
      </div>
      <div className="down">
        <button
          onClick={() => {
            navigate("/dashboard");
          }}
        >
          Find a pal!
        </button>
        <Link to={`/eventinfo/${eventId}`}>Event Info</Link>
      </div>
    </div>
  );
};
export default EventCard;
