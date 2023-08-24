import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import Nav from "../components/Nav";
import axios from "axios";

const EventInfo = () => {
  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  const handleLogout = () => {
    removeCookie("UserId", cookies.UserId);
    removeCookie("AuthToken", cookies.AuthToken);
    window.location.reload();
  };

  const EventData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/geteventdata/${id}`
      );
      setEvent(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    EventData();
  }, []);

  return (
    <>
      <Nav
        minimal={true}
        setShowModal={() => {}}
        showModal={false}
        authToken={cookies.AuthToken}
        handleLogout={handleLogout}
      />
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        event && (
          <div className="event_info">
            <div className="event_details">
              <div
                className="image_container"
                style={{ backgroundImage: `url(${event.url})` }}
              >
                <h1>{event.title}</h1>
              </div>
              <div className="info_container">
                <h3>Address: {event.address}</h3>
                <h3>
                  Time: {event.hour}:{event.minutes} {event.timeOfDay}
                </h3>
                <h3>About: {event.about}</h3>
                <h3>Price: {event.isPayable ? event.price : "Free"}</h3>
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default EventInfo;
