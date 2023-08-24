import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import axios from "axios";

const EventInfo = ({ title }) => {
  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const EventData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/geteventdata`,
        {
          params: {
            title: title,
          },
        }
      );
      setEvent(response.data[0]);
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
      <Nav minimal={true} setShowModal={() => {}} showModal={false} />
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
