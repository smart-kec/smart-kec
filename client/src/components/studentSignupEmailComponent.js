import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { generateAndSendEmailOtp } from "../api/AurthenticationServices";
import styles from "../assets/styles/css/EmailPage.module.css";

function StudentEmailSignup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const emailValidation = () => {
    const regEx = /([a-zA-Z]+)[.]([0-9]+)([a-z0-9]+)@kongu([.])edu/;
    regEx.test(email) ? sendData() : setMessage("Email is not valid");
  };
  const sendData = async () => {
    try {
      const res = await generateAndSendEmailOtp({ userEmail: email });
      const msg = res.data.message;
      if (msg === "otp generated") {
        navigate(`/signup/verify`);
      } else if (msg === "verified user") {
        navigate(`/signup/details`);
      } else if (msg === "already registered") {
        const userMsg = "Account with this email is already registered.";
        console.log(userMsg);
      } else {
        console.log(res.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleOnChange = (e) => {
    setEmail(e.target.value);
  };
  return (
    <div className={styles.app}>
      <div className={styles.head}>
        <h2> Student Signup </h2>{" "}
      </div>{" "}
      <div className={styles.con}>
        <label htmlFor="email" className={styles.label}>
          {" "}
          Email:{" "}
        </label>{" "}
        <input
          id="email"
          className={styles.input1}
          type="email"
          placeholder="abc.20cse@kongu.edu"
          value={email}
          onChange={handleOnChange}
        />{" "}
        <div className={styles.buttone}>
          <button className={styles.buttone} onClick={emailValidation}>
            {" "}
            Proceed to OTP Generation{" "}
          </button>{" "}
        </div>{" "}
        <p className={styles.message}> {message} </p>{" "}
      </div>{" "}
    </div>
  );
}

export default StudentEmailSignup;
