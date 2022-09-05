import React, { useState } from "react";
import styles from "../../assets/styles/css/Otp.module.css";

const OTPBox = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));

  const [counter, setCounter] = React.useState(159);
  React.useEffect(() => {
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

  return (
    <>
      <div className={styles.app}>
        <div className={styles.header}>
          <div className={styles.card}>
            <div className={styles.head}><h1>AUTHENTICATION</h1></div>
            <p className=" content">
              Enter the OTP sent to ****.20**@kongu.edu email
              <div className="lnk">
                <a href="/signup/stdemail">Change Email ID</a>
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
                onClick={(e) => setOtp([...otp.map((v) => "")])}
              >
                Continue
              </button>
              <button
                className={styles.button3}
                onClick={(e) => setOtp([...otp.map((v) => "")])}
              >
                Resend OTP in{" "}
                <div className={styles.counters}>
                  00:{counter<10 ? "0"+counter:counter}
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
