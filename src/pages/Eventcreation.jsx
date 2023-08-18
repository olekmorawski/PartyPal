import Nav from "../components/Nav";

const EventCreation = () => {
  const handleSubmit = () => {
    console.log("submited");
  };

  const handleChange = () => {
    console.log("changed");
  };

  return (
    <>
      <Nav minimal={true} setShowModal={() => {}} showModal={false} />
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
              value={""}
              onChange={handleChange}
            />
            <label htmlFor="address">Event Address</label>
            <input
              type="text"
              name="address"
              id="address"
              placeholder="Event address"
              required={true}
              value={""}
              onChange={handleChange}
            />
            <label htmlFor="hour">Event Hour</label>
            <input
              type="text"
              name="hour"
              id="hour"
              placeholder="Event hour"
              required={true}
              value={""}
              onChange={handleChange}
            />
            <label htmlFor="about">About the Event</label>
            <input
              type="text"
              name="about"
              id="about"
              value={""}
              onChange={handleChange}
              required={true}
              placeholder="Description of the event"
            />
            <label htmlFor="isPayable">Is Payable?</label>
            <input
              type="checkbox"
              name="isPayable"
              id="isPayable"
              onChange={handleChange}
              checked={""}
            />
            <label htmlFor="price">Price</label>
            <input
              type="text"
              name="price"
              id="price"
              placeholder="Event price"
              value={""}
              onChange={handleChange}
              disabled={""}
            />
            <label htmlFor="imageUrl">Event Image URL</label>
            <input
              type="url"
              name="imageUrl"
              id="imageUrl"
              onChange={handleChange}
              required={true}
            />
            <div className="image-container">
              <img src={""} alt="event preview" />)
            </div>
            <input type="submit" />
          </section>
        </form>
      </div>
    </>
  );
};

export default EventCreation;
