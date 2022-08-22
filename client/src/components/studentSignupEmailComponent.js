import { useState } from "react";
import styles from "../assets/styles/css/EmailPage.module.css";

function StudentEmailSignup() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const emailValidation = () => {
    const regEx = /([a-zA-Z]+)[.]([0-9]+)([a-z0-9]+)@kongu([.])edu/;

    if (regEx.test(email)) {
      setMessage("Email is valid");
    } else if (!regEx.test(email) && email !== " ") {
      setMessage("Email is not valid");
    } else {
      setMessage(" ");
    }
  };

  const handleOnChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div className={styles.app}>
      <div className={styles.head}>
        <h2> Email Page </h2>{" "}
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
