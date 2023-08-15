import { useState } from "react";
import Nav from "../components/Nav";

const Onboarding = () => {
  const handleSubmit = () => {
    console.log("submited");
  };
  const handleChange = () => {
    console.log("changed");
  };
  return (
    <>
      <Nav minimal={true} setShowModal={() => {}} showModal={false} />
      <div className="onboarding">
        <h2>CREATE ACCOUNT</h2>
        <form onSubmit={handleSubmit}>
          <section>
            <label htmlFor="first_name">First Name</label>
            <input
              type="text"
              name="first_name"
              id="first_name"
              placeholder="First name"
              required={true}
              value={""}
              onChange={handleChange}
            />
            <label>Birthday</label>
            <div className="multiple_input_container">
              <input
                type="number"
                name="bod_day"
                id="bod_day"
                placeholder="DD"
                required={true}
                value={""}
                onChange={handleChange}
              />
              <input
                type="number"
                name="bod_month"
                id="bod_month"
                placeholder="MM"
                required={true}
                value={""}
                onChange={handleChange}
              />
              <input
                type="number"
                name="bod_year"
                id="bod_year"
                placeholder="YYYY"
                required={true}
                value={""}
                onChange={handleChange}
              />
            </div>
            <label>Sex</label>
            <div className="multiple_input_container">
              <input
                type="radio"
                name="sex"
                id="man_sex"
                value="man"
                onChange={handleChange}
                checked={false}
              />
              <label htmlFor="man_sex">Man</label>
              <input
                type="radio"
                name="sex"
                id="woman_sex"
                value="woman"
                onChange={handleChange}
                checked={true}
              />
              <label htmlFor="woman_sex">Woman</label>
              <input
                type="radio"
                name="sex"
                id="more_sex"
                value="more"
                onChange={handleChange}
                checked={false}
              />
              <label htmlFor="more_sex">More</label>
            </div>
            <label htmlFor="show_sex">Show gender on my profile</label>
            <input
              type="checkbox"
              name="show_sex"
              id="show_sex"
              onChange={handleChange}
              checked={false}
            />
            <label>Show Me</label>
            <div className="multiple_input_container">
              <input
                type="radio"
                name="sex_interest"
                id="man_sex_interest"
                value="man"
                onChange={handleChange}
                checked={false}
              />
              <label htmlFor="man_sex">Man</label>
              <input
                type="radio"
                name="sex_interest"
                id="woman_sex_interest"
                value="woman"
                onChange={handleChange}
                checked={false}
              />
              <label htmlFor="woman_sex">Woman</label>
              <input
                type="radio"
                name="sex_interest"
                id="everyone_sex_interest"
                value="everyone"
                onChange={handleChange}
                checked={false}
              />
              <label htmlFor="more_sex">Everyone</label>
            </div>
            <label htmlFor="about">About Me</label>
            <input
              type="text"
              name="about"
              id="about"
              value={""}
              onChange={handleChange}
              required={true}
              placeholder="I like trains"
            />
            <input type="submit" />
          </section>

          <section>
            <label htmlFor="url">Profile Photo</label>
            <input
              type="url"
              name="url"
              id="url"
              onChange={handleChange}
              required={true}
            />
            <div className="photo_container"></div>
          </section>
        </form>
      </div>
    </>
  );
};
export default Onboarding;
