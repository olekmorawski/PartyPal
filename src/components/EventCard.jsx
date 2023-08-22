const EventCard = ({ title, url }) => {
  return (
    <div className="event" style={{ backgroundImage: `url(${url})` }}>
      <div className="up"></div>
      <div className="down">
        <button
          onClick={() => {
            window.location.href = "/dashboard";
          }}
        >
          Find a pal!
        </button>
        <p>{title}</p>
      </div>
    </div>
  );
};

export default EventCard;
