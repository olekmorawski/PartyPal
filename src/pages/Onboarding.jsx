import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import axios from "axios";

const Onboarding = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [formData, setFormData] = useState({
    user_id: cookies.UserId,
    first_name: "",
    dob_day: "",
    dob_month: "",
    dob_year: "",
    show_sex: false,
    sex: "man",
    sex_interest: "woman",
    url: "",
    about: "",
    matches: [],
  });

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    console.log("submited");
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8000/user`, {
        formData,
      });
      const success = response.status === 200;

      if (success) navigate("/dashboard");
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;

    const name = e.target.name;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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
              value={formData.first_name}
              onChange={handleChange}
            />
            <label>Birthday</label>
            <div className="multiple_input_container">
              <input
                type="number"
                name="dob_day"
                id="dob_day"
                placeholder="DD"
                required={true}
                value={formData.dob_day}
                onChange={handleChange}
              />
              <input
                type="number"
                name="dob_month"
                id="dob_month"
                placeholder="MM"
                required={true}
                value={formData.dob_month}
                onChange={handleChange}
              />
              <input
                type="number"
                name="dob_year"
                id="dob_year"
                placeholder="YYYY"
                required={true}
                value={formData.dob_year}
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
                checked={formData.sex === "man"}
              />
              <label htmlFor="man_sex">Man</label>
              <input
                type="radio"
                name="sex"
                id="woman_sex"
                value="woman"
                onChange={handleChange}
                checked={formData.sex === "woman"}
              />
              <label htmlFor="woman_sex">Woman</label>
              <input
                type="radio"
                name="sex"
                id="more_sex"
                value="more"
                onChange={handleChange}
                checked={formData.sex === "more"}
              />
              <label htmlFor="more_sex">More</label>
            </div>
            <label htmlFor="show_sex">Show gender on my profile</label>
            <input
              type="checkbox"
              name="show_sex"
              id="show_sex"
              onChange={handleChange}
              checked={formData.show_sex}
            />
            <label>Show Me</label>
            <div className="multiple_input_container">
              <input
                type="radio"
                name="sex_interest"
                id="man_sex_interest"
                value="man"
                onChange={handleChange}
                checked={formData.sex_interest === "man"}
              />
              <label htmlFor="man_sex_interest">Man</label>
              <input
                type="radio"
                name="sex_interest"
                id="woman_sex_interest"
                value="woman"
                onChange={handleChange}
                checked={formData.sex_interest === "woman"}
              />
              <label htmlFor="woman_sex_interest">Woman</label>
              <input
                type="radio"
                name="sex_interest"
                id="everyone_sex_interest"
                value="everyone"
                onChange={handleChange}
                checked={formData.sex_interest === "everyone"}
              />
              <label htmlFor="everyone_sex_interest">Everyone</label>
            </div>
            <label htmlFor="about">About Me</label>
            <input
              type="text"
              name="about"
              id="about"
              value={formData.about}
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
            <div className="photo_container">
              {formData.url && (
                <img src={formData.url} alt="pofile picture preview" />
              )}
            </div>
          </section>
        </form>
      </div>
    </>
  );
};
export default Onboarding;
