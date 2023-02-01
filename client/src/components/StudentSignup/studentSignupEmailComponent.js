import { React, useState } from "react";
import { useNavigate } from "react-router-dom";

import { generateAndSendEmailOtp } from "../../api/AurthenticationServices";
import styles from "../../assets/styles/css/EmailPage.module.css";
import { connect, useDispatch, useSelector } from "react-redux";
import { loadingPage, setData } from "./../../store/action";
import { useEffect } from "react";

var uEmail;
function StudentEmailSignup({ addData, data }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const showLoad = useSelector((state) => state.showLoading);

  const emailValidation = () => {
    const regEx = /([a-zA-Z]+)[.]([0-9]+)([a-z0-9]+)@kongu([.])edu/;
    regEx.test(email) ? sendData() : setMessage("Email is not valid");
  };
  useEffect(() => {
    console.log("Page ", showLoad);
    if (showLoad) {
      return 
      // navigate(`/testing`);
    }
  });
  
  const sendData = async () => {
    try {
      dispatch(loadingPage(true));
      const res = await generateAndSendEmailOtp({ userEmail: email });

      const msg = res.data.message;
      const status = res.data.STATUS;
      console.log(res);
      if (status === "SUCCESS") {
        uEmail = email;
        addData();
        dispatch(loadingPage(false));
        if (msg === "otp generated") {
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
      dispatch(loadingPage(false));
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

const mapStateToProps = (state) => ({
  data: state.data,
  showLoading: state.showLoading,
});

const mapDispatchToProps = (dispatch) => {
  return {
    addData: () => {
      // dispatch(loadingPage(true));
      dispatch(setData(uEmail));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(StudentEmailSignup);
