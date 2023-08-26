import { useNavigate, Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useState } from "react";
import axios from "axios";

const EventCard = ({ title, url, eventId }) => {
  const [isStarSelected, setIsStarSelected] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  const navigate = useNavigate();

  const userId = cookies.UserId;

  const isInterested = async () => {
    try {
      const response = await axios.put("http://localhost:8000/addattendee", {
        userId,
        eventId,
      });
      if (response.status === 200) {
        const action = response.data.action;
        setIsStarSelected(action === "added");
        return true;
      }
    } catch (err) {
      console.error("Could not add or remove attendee: ", err);
      return false;
    }
  };

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
          onClick={async () => {
            if (await isInterested()) {
              setIsStarSelected(!isStarSelected);
            }
          }}
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
            navigate(`/dashboard/${eventId}`);
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
