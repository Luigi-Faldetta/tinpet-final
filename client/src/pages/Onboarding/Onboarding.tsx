//@ts-nocheck
import Nav from "../../components/Nav/Nav";
import React, { useState, FormEvent, ChangeEvent, useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./onboarding.css";
import { Cloudinary } from "@cloudinary/base";
import UserService from "../../UserService";

interface FormData {
  _id?: string;
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
  const [cloudinaryScriptLoaded, setCloudinaryScriptLoaded] = useState(false);
  const [cloudinary, setCloudinary] = useState<Cloudinary | null>(null);
  // const [cookies, setCookie] = useCookies(["user"]);
  const [cookies, setCookie] = useCookies();
  // console.log(cookies);
  const [formData, setFormData] = useState<FormData>({
    // user_id: cookies.user?.UserId,
    _id: cookies.UserId,
    ownerName: "",
    dogName: "",
    ownerAge: 0,
    dogAge: 0,
    gender: "",
    about: "",
    matches: [],
    avatar: "",
  });

  const openCloudinaryWidget = () => {
    if (!cloudinary || !cloudinary.createUploadWidget) {
      console.error("Cloudinary is not available");
      return;
    }

    const widget = cloudinary.createUploadWidget(
      {
        cloudName: "doqmqgbym",
        uploadPreset: "mfrvfjgq",
        // folder: "home/avatars",
      },
      (error: string, result: any) => {
        if (!error && result && result.event === "success") {
          setFormData((prevState) => ({
            ...prevState,
            avatar: result.info.secure_url,
          }));
        }
      }
    );

    widget.open();
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://widget.cloudinary.com/v2.0/global/all.js";
    script.type = "text/javascript";
    script.onload = () => {
      setCloudinaryScriptLoaded(true);
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (cloudinaryScriptLoaded) {
      setCloudinary(window.cloudinary);
    }
  }, [cloudinaryScriptLoaded]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { avatar, ...restData } = formData;

      formData.dogAge = Number(formData.dogAge);
      formData.ownerAge = Number(formData.ownerAge);
      console.log(formData);
      console.log(typeof formData.dogAge);
      console.log(typeof formData.ownerAge);
      // const response = await axios
      //   .put("http://localhost:3000/updateUser", { ...restData, avatar })
      const response = await UserService.updateUser(
        restData,
        avatar,
        cookies.UserId
      ).then((response) => {
        // console.log(formData);
        setCookie("_id", cookies.UserId);
        // console.log(cookies);
        const success = response.status === 200;
        if (success) {
          navigate("/dashboard");
          console.log("Submitted!!");
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "avatar") {
      e.preventDefault();
      openCloudinaryWidget();
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
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

        <form encType="multipart/form-data" onSubmit={handleSubmit}>
          <section>
            <label htmlFor="first_name">Your name</label>
            <input
              type="text"
              name="ownerName"
              id="yourname"
              placeholder="Your name"
              required={true}
              value={formData.ownerName}
              onChange={handleChange}
            />
            <label>your age</label>
            <input
              type="number"
              name="ownerAge"
              id="yourage"
              placeholder="Your age"
              required={true}
              value={formData.ownerAge}
              onChange={handleChange}
            />
            <label htmlFor="first_name">Your dog's name</label>
            <input
              type="text"
              name="dogName"
              id="dogname"
              placeholder="Your dog's name"
              required={true}
              value={formData.dogName}
              onChange={handleChange}
            />
            <label>Your dog's age</label>
            <input
              type="number"
              name="dogAge"
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
              // required={true}
              onChange={handleChange}
            />
            <button type="button" onClick={handleChange} name="avatar">
              Select Profile Picture
            </button>
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
