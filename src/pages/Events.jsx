import Nav from "../components/Nav";
import EventCard from "../components/EventCard";
import axios from "axios";
import { useState, useEffect } from "react";

const Events = () => {
  const [events, setEvents] = useState([]);

  const getEvent = async (e) => {
    try {
      const response = await axios.get("http://localhost:8000/getevent", {
        params: eventFormData,
      });

      const newEvent = response.data;
      setEvents((prevEvents) => [newEvent, ...prevEvents]);
      console.log(setEvents);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getEvent();
  }, []);
  console.log();

  return (
    <>
      <Nav minimal={true} setShowModal={() => {}} showModal={false} />
      <div className="events">
        <div className="add_event_container">
          <button
            className="add_event_btn"
            onClick={() => {
              window.location.href = "/eventcreation";
            }}
          >
            +
          </button>
          <div className="add_event_text">
            <p className="text">Add your own event!</p>
          </div>
        </div>
        <div className="events_container">
          {events.map((event) => (
            <EventCard />
          ))}
        </div>
      </div>
    </>
  );
};

export default Events;
