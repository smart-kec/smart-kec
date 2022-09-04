import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { generateAndSendEmailOtp } from "../../api/AurthenticationServices";
import styles from "../../assets/styles/css/EmailPage.module.css";
import { useDispatch } from "react-redux";
import { storeEmail } from "../../store/signupStore";

function StudentEmailSignup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const emailValidation = () => {
    const regEx = /([a-zA-Z]+)[.]([0-9]+)([a-z0-9]+)@kongu([.])edu/;
    regEx.test(email) ? sendData() : setMessage("Email is not valid");
  };
  const sendData = async () => {
    try {
      const res = await generateAndSendEmailOtp({ userEmail: email });
      const msg = res.data.message;
      const status = res.data.STATUS;
      if (status === "success") {
        if (msg === "otp generated") {
          // dispatch(storeEmail(email));
          navigate(`/signup/verify`);
        } else if (msg === "verified user") {
          navigate(`/signup/details`);
        }
      } else if (status === "warning") {
        if (msg === "already registered") {
          alert("Account with this email is already registered.");
        }
      } else {
        if (msg === "error") {
          alert("Error : Try Again after some time");
        } else if (msg === "Email Error") {
          alert(
            "Error in sending a One Time Password... Try again after some time"
          );
        }
      }
    } catch (err) {
      alert("Try Again after some time");
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
        <p className={styles.message}> {message} </p>{" "}
        <div className={styles.buttone}>
          <button className={styles.buttone} onClick={emailValidation}>
            {" "}
            Proceed to OTP Generation{" "}
          </button>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}

export default StudentEmailSignup;
