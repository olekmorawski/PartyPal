import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Nav from "../components/Nav";
import axios from "axios";

const EventCreation = () => {
  const [eventFormData, setEventFormData] = useState({
    title: "",
    address: "",
    hour: "",
    minutes: "",
    timeOfDay: "AM",
    about: "",
    isPayable: false,
    price: "",
    url: "",
    attendees: [],
  });

  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  const handleLogout = () => {
    removeCookie("UserId", cookies.UserId);
    removeCookie("AuthToken", cookies.AuthToken);
    window.location.reload();
  };
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/create-event", {
        eventFormData,
      });
      const success = response.status === 200;
      if (success) navigate("/events");
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    const name = e.target.name;

    setEventFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <>
      <Nav
        minimal={true}
        setShowModal={() => {}}
        showModal={false}
        authToken={cookies.AuthToken}
        handleLogout={handleLogout}
      />
      <div className="event-creation">
        <h2>Create Event</h2>
        <form onSubmit={handleSubmit}>
          <section>
            <label htmlFor="title">Event Title</label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Event title"
              required={true}
              value={eventFormData.title}
              onChange={handleChange}
            />
            <label htmlFor="address">Event Address</label>
            <input
              type="text"
              name="address"
              id="address"
              placeholder="Event address"
              required={true}
              value={eventFormData.address}
              onChange={handleChange}
            />
            <label>Event Hour</label>
            <div className="multiple_input_container">
              <input
                type="number"
                name="hour"
                id="hour"
                placeholder="H"
                required={true}
                value={eventFormData.hour}
                onChange={handleChange}
                min="1"
                max="12"
              />
              <input
                type="number"
                name="minutes"
                id="minutes"
                placeholder="M"
                required={true}
                value={eventFormData.minutes}
                onChange={handleChange}
                min="0"
                max="59"
              />
              <select
                name="timeOfDay"
                id="timeOfDay"
                value={eventFormData.timeOfDay}
                onChange={handleChange}
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
            <label htmlFor="about">About the Event</label>
            <input
              type="text"
              name="about"
              id="about"
              value={eventFormData.about}
              onChange={handleChange}
              required={true}
              placeholder="Description of the event"
            />
            <label htmlFor="isPayable">Is it a Free Event?</label>
            <input
              type="checkbox"
              name="isPayable"
              id="isPayable"
              onChange={handleChange}
              checked={eventFormData.isPayable}
            />
            <div className="price-container">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                name="price"
                id="price"
                placeholder="Price"
                value={eventFormData.price}
                onChange={handleChange}
                disabled={eventFormData.isPayable}
                required={!eventFormData.isPayable}
              />
            </div>
            <input type="submit" />
          </section>
          <section>
            <label htmlFor="url">Event Image URL</label>
            <input
              type="url"
              name="url"
              id="url"
              onChange={handleChange}
              required={true}
            />
            <div className="photo-container">
              {eventFormData.url && (
                <img src={eventFormData.url} alt="event picture preview" />
              )}
            </div>
          </section>
        </form>
      </div>
    </>
  );
};

export default EventCreation;
