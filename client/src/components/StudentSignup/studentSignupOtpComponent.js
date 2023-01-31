import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import styles from "../../assets/styles/css/Otp.module.css";
import { checkOtpExpiry, verifyOtp } from "./../../api/AurthenticationServices";

const OTPBox = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const navigate = useNavigate();
  const stdEmail = useSelector((state) => state.data);
  const [counter, setCounter] = React.useState(159);

  React.useEffect(() => {
    /* eslint-disable */
    if (stdEmail === "nill") {
      navigate("/signup/email");
    }
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  //API
  const sendData = async () => {
    try {
      const checkExp = await checkOtpExpiry({ userEmail: stdEmail });

      if (checkExp.data.STATUS === "success") {
        const res = await verifyOtp({
          userEmail: stdEmail,
          userotp: otp.join(""),
        });

        const msg = res.data.message;
        console.log(msg);
        if (res.data.STATUS === "success") {
          if (msg === "otp verified") {
            navigate(`/signup/details`);
          } else {
            navigate(`/signup/email`);
          }
        } else {
          alert(msg);
          navigate(`/signup/email`);
        }
      } else {
        const msg = res.data.message;
        alert(msg);
        navigate(`/signup/email`);
      }
    } catch (error) {
      alert("Error! Try Again after some time");
      navigate(`/signup/email`);
      console.log(error);
    }
  };

  return (
    <>
      <div className={styles.app}>
        <div className={styles.header}>
          <div className={styles.card}>
            <h1>AUTHENTICATION</h1>
            <p className=" content">
              Enter the One Time Password(OTP) sent to {stdEmail}
              <div className="lnk">
                <a href="/signup/email">Change Email</a>
              </div>
            </p>
            <div className={styles.otp_number_input}>
              {otp.map((data, index) => {
                return (
                  <input
                    className={styles.otpfield}
                    type="text"
                    name="otp"
                    maxLength="1"
                    key={index}
                    value={data}
                    onChange={(e) => handleChange(e.target, index)}
                    onFocus={(e) => e.target.select()}
                  />
                );
              })}
            </div>
            <div className="button">
              <button
                className={styles.button1}
                onClick={(e) => setOtp([...otp.map((v) => "")])}
              >
                Clear
              </button>
              <button
                className={styles.button2}
                // onClick={(e) => setOtp([...otp.map((v) => "")])}
                onClick={sendData}
              >
                Continue
              </button>
              <button
                className={styles.button3}
                onClick={(e) => setOtp([...otp.map((v) => "")])}
              >
                Resend OTP in{" "}
                <div className={styles.counters}>
                  00:{counter < 10 ? "0" + counter : counter}
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OTPBox;
