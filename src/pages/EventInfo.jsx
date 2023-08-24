import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import axios from "axios";

const EventInfo = () => {
  return (
    <>
      <Nav minimal={true} setShowModal={() => {}} showModal={false} />
      <div className="event-info"></div>
    </>
  );
};

export default EventInfo;
