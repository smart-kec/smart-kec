import React from "react";
import { useState } from "react";
import "./Front.css";
import Detail from "./Details";
const Front = () => {
  const [show, setshow] = useState(true);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [email1, setemail1] = useState("");
  const [password1, setpassword1] = useState("");
  const handler = (data) => {
    setemail(data);
  };
  const handler1 = (data) => {
    setpassword(data);
  };
  const handler2 = (data) => {
    setemail1(data);
  };
  const handler3 = (data) => {
    setpassword1(data);
  };
  const submit = (event) => {
    event.preventDefault();
    setemail("");
    setpassword("");
    setemail1("");
    setpassword1("");
  };

  return (
  
    <div>
      <div className="border">
        <h2>HOD</h2>
        <button className="box" onClick={() => setshow((s) => !s)}>
          ADD
        </button>
      </div>
      <div className="container" style={{ display: show ? "none" : "block" }}>
        <div className="text">Login Form</div>
        <form onSubmit={submit}>
          <div className="data">
            <label>Email or Phone</label>
            <input
              type="text"
              value={email}
              onChange={(event) => handler(event.target.value)}
            />
          </div>
          <div className="data">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(event) => handler1(event.target.value)}
            />
          </div>

          <button type="submit" onClick={() => setshow((s) => !s)}>
            login
          </button>
        </form>
      </div>
      <Detail></Detail>
      <div className="border">
        <h2>YEAR INCHARGE</h2>
        <button className="box" onClick={() => setshow((s) => !s)}>
          ADD
        </button>
      </div>
      <div className="container" style={{ display: show ? "none" : "block" }}>
        <div className="color">
          <div className="box1">
            <button onClick={() => setshow((s) => !s)}>X</button>
          </div>
          <div className="text">Login Form</div>
          <form onSubmit={submit}>
            <div className="data">
              <label>Email or Phone</label>
              <input
                type="text"
                value={email1}
                onChange={(event) => handler2(event.target.value)}
              />
            </div>
            <div className="data">
              <label>Password</label>
              <input
                type="password"
                value={password1}
                onChange={(event) => handler3(event.target.value)}
              />
            </div>

            <button type="submit" onClick={() => setshow((s) => !s)}>
              login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Front;
