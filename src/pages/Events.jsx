import React, { useState, useEffect } from "react";
import Nav from "../components/Nav";
import EventCard from "../components/EventCard";
import axios from "axios";

const Events = () => {
  const [events, setEvents] = useState([]);

  const getEvent = async () => {
    try {
      const response = await axios.get("http://localhost:8000/getevent");
      const newEvents = response.data;
      setEvents(newEvents)
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getEvent();
  }, []);

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
          {events.map((event, index) => (
            <EventCard key={index} title={event.title} url={event.url} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Events;
