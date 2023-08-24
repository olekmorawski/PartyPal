import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import EventCard from "../components/EventCard";
import axios from "axios";

const Events = () => {
  const [events, setEvents] = useState([]);

  const navigate = useNavigate();
  const getEventCard = async () => {
    try {
      const response = await axios.get("http://localhost:8000/geteventcard");
      const newEvents = response.data;
      setEvents(newEvents);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getEventCard();
  }, []);

  return (
    <>
      <Nav minimal={true} setShowModal={() => {}} showModal={false} />
      <div className="events">
        <div className="add_event_container">
          <button
            className="add_event_btn"
            onClick={() => {
              navigate("/eventcreation");
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
            <EventCard
              key={event._id}
              title={event.title}
              url={event.url}
              eventId={event._id}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Events;
