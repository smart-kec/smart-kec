import React, { useState } from "react";
import './Otp.css';

const OTPBox = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));

  const handleChange = (element, index) => {
      if(isNaN(element.value)) return false; 

      setOtp([...otp.map((d,idx)=> (idx === index) ? element.value : d)]);

      if(element.nextSibling){
        element.nextSibling.focus();
      }

  };
  return(
    <>
        <div className = "app">
          <div className = "header">
            <div className = "card">
            <h1>AUTHENTICATION</h1>
            <p className = " content">Enter the OTP sent to ****.20**@kongu.edu email
            <div className = "lnk">
            <a href = "/email">Change Email ID</a>
            </div>
            </p>
            {otp.map((data, index) => {
              return (
                <input 
                    className = "otp-field"
                    type = "text"
                    name ="otp"
                    maxLength="1"
                    key = {index}
                    value = {data}
                    onChange={e => handleChange(e.target, index)}
                    onFocus = {e => e.target.select()}
                />
              );
            })}
              <div className = "button">
              <button className = "button1" onClick ={e => setOtp([...otp.map(v=> "")])}>Clear</button>
              <button className = "button2" onClick ={e => setOtp([...otp.map(v=> "")])}>Continue</button>
              <button className = "button3" onClick ={e => setOtp([...otp.map(v=> "")])}>Resend OTP</button>
              </div>
            </div>
          </div>
        </div>

    </>
  );
};

export default OTPBox;
