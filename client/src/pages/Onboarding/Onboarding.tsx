import Nav from "../../components/Nav/Nav";
import React, { useState, FormEvent, ChangeEvent } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./onboarding.css";

interface FormData {
  user_id?: string;
  ownerName: string;
  dogName: string;
  ownerAge: number;
  dogAge: number;
  gender: string;
  about: string;
  matches: string[];
  avatar: string;
}

const Onboarding: React.FC = () => {
  const navigate = useNavigate();

  const [cookies] = useCookies(["user"]);
  const [formData, setFormData] = useState<FormData>({
    user_id: cookies.user?.UserId,
    ownerName: "",
    dogName: "",
    ownerAge: 0,
    dogAge: 0,
    gender: "",
    about: "",
    matches: [],
    avatar: "",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitted");
    try {
      const response = await axios.put("http://localhost:3000/user", {
        formData,
      });
      const success = response.status === 200;
      if (success) navigate("/dashboard");
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.name;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <Nav
        setShowModal={() => {}}
        showModal={false}
        setIsSignUp={() => {}}
        authToken={false}
      />
      <div className="onboarding">
        <h2>CREATE ACCOUNT</h2>

        <form onSubmit={handleSubmit}>
          <section>
            <label htmlFor="first_name">Your name</label>
            <input
              type="text"
              name="yourname"
              id="yourname"
              placeholder="Your name"
              required={true}
              value={formData.ownerName}
              onChange={handleChange}
            />
            <label>your age</label>
            <input
              type="number"
              name="yourage"
              id="yourage"
              placeholder="Your age"
              required={true}
              value={formData.ownerAge}
              onChange={handleChange}
            />
            <label htmlFor="first_name">Your name</label>
            <input
              type="text"
              name="dogname"
              id="dogname"
              placeholder="Your dog's name"
              required={true}
              value={formData.dogName}
              onChange={handleChange}
            />
            <label>Your dog's age</label>
            <input
              type="number"
              name="dogage"
              id="dogage"
              placeholder="Your dog's age"
              required={true}
              value={formData.dogAge}
              onChange={handleChange}
            />
            <label>Gender</label>
            <div className="multiple-input-container">
              <input
                id="male-gender"
                type="radio"
                name="gender"
                placeholder="Gender"
                value="male"
                checked={formData.gender === "male"}
                onChange={handleChange}
              />
              <label htmlFor="male-gender">Male</label>
              <input
                id="female-gender"
                type="radio"
                name="gender"
                placeholder="Gender"
                value="female"
                checked={formData.gender === "female"}
                onChange={handleChange}
              />
              <label htmlFor="female-gender">Female</label>
            </div>

            <label htmlFor="about">About me and my dog</label>
            <input
              id="about"
              type="text"
              name="about"
              required={true}
              placeholder="We are a great bunch"
              value={formData.about}
              onChange={handleChange}
            />
            <input type="submit" value="Submit" />
          </section>

          <section>
            <label htmlFor="about">Profile Picture</label>
            <input
              id="avatar"
              type="url"
              name="avatar"
              required={true}
              onChange={handleChange}
            />
            <div className="photo-container">
              {formData.avatar && (
                <img src={formData.avatar} alt="profile picture" />
              )}
            </div>
          </section>
        </form>
      </div>
    </>
  );
};

export default Onboarding;
