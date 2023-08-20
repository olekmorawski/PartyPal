import Nav from "../components/Nav";

const Events = () => {
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
          <div className="event">
            <div className="up"></div>
            <div className="down">
              <button
                onClick={() => {
                  window.location.href = "/dashboard";
                }}
              >
                Find a pal!
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Events;
