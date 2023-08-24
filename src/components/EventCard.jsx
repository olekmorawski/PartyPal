import { useNavigate } from "react-router-dom";
import { useState } from "react";

const EventCard = ({ title, url }) => {
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
          className={`star-button ${isStarSelected ? "selected" : ""}`}
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
        <button
          onClick={() => {
            navigate("/eventinfo");
          }}
        >
          Event Info
        </button>
      </div>
    </div>
  );
};

export default EventCard;
