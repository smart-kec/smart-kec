import { useState } from "react";
import "./EmailPage.css";

function EmailPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const emailValidation = () => {
    const regEx = /([a-zA-Z]+)[\.]([0-9]+)([a-z0-9]+)@kongu([.])edu/;
    if (regEx.test(email)) {
      setMessage("Email is Valid");
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
    <div className="app">
      <div className="header">
        <h2> Email Page </h2>{" "}
      </div>{" "}
      <div className="card">
        <label htmlFor="email" className="label">
          {" "}
          Email:{" "}
        </label>{" "}
        <input
          id="email"
          className="input"
          type="email"
          placeholder="abc.20cse@kongu.edu"
          value={email}
          onChange={handleOnChange}
        />{" "}
        <div className="button">
          <button className="button" onClick={emailValidation}>
            {" "}
            Proceed to OTP Generation{" "}
          </button>{" "}
        </div>{" "}
        <p className="message"> {message} </p>{" "}
      </div>{" "}
    </div>
  );
}

export default EmailPage;
