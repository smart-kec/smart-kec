import React, { useState } from "react";

import {
  Textarea,
  Organize,
  Organizelayout,
  Organizefront,
} from "../assets/styles/style/CreateOrganizerElements";
const CreateOrganizer = () => {
  const [Name, setName] = useState("");
  const [collegeName, setCollegeName] = useState("");
  const [Phone, setPhone] = useState("");
  const [Email, setEmail] = useState("");
  const [Type, setType] = useState("");
  const [Program, setProgram] = useState("");
  const [Branch, setBranch] = useState("");
  const [Description, setDescription] = useState("");
  const [Designation, setDesignation] = useState("");
  const [password, setpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const Handler = (data) => {
    setName(data);
  };
  const Handler1 = (data) => {
    setCollegeName(data);
  };
  const Handler2 = (data) => {
    setPhone(data);
  };
  const Handler3 = (data) => {
    setEmail(data);
  };
  const Handler4 = (data) => {
    setType(data);
  };

  const Handler5 = (data) => {
    Program(data);
  };
  const Handler6 = (data) => {
    setDescription(data);
  };
  const Handler8 = (data) => {
    setDesignation(data);
  };
  const Handler9 = (data) => {
    setBranch(data);
  };
  const Handler10 = (data) => {
    setpassword(data);
  };
  const Handler11 = (data) => {
    setconfirmpassword(data);
  };

  const submit = (event) => {
    event.preventDefault();

    setName("");
    setEmail("");
    setCollegeName("");
    setPhone("");
    setProgram("");
    setDescription("");
    setBranch("");
    setDesignation("");
    setpassword("");
    setconfirmpassword("");
  };
  return (
    <form onSubmit={submit}>
      <Organize>
        <Organizelayout>
          <Organizefront>
            <label>Name</label>
            <input
              type="text"
              onChange={(event) => Handler(event.target.value)}
              value={Name}
            />
          </Organizefront>
          <Organizefront>
            <label>College Name</label>

            <input
              type="text"
              onChange={(event) => Handler1(event.target.value)}
              value={collegeName}
            />
          </Organizefront>
          <Organizefront>
            <label>Types</label>
            <select
              onChange={(event) => Handler4(event.target.value)}
              value={Type}
            >
              <option>ASSOCIATION</option>
              <option>NCC/NSS</option>
              <option>CELLS & CLUBS </option>
              <option>SOCIETIES</option>
            </select>
          </Organizefront>
          <Organizefront>
            <label>Program</label>
            <select
              onChange={(event) => Handler5(event.target.value)}
              value={Type}
            >
              <option>B.E</option>
              <option>B TECH</option>
              <option>COMMON TO ALL </option>
            </select>
          </Organizefront>
          <Organizefront>
            <label>Branch</label>
            <select
              onChange={(event) => Handler9(event.target.value)}
              value={Branch}
            >
              {/* Options from backed ... request for backend */}
              <option>CSE</option>
              <option>IT</option>
              <option>EEE</option>
              <option>EIE</option>
              <option>COMMON TO ALL </option>
            </select>
          </Organizefront>

          <Organizefront>
            <label>Designation</label>
            <select
              onChange={(event) => Handler8(event.target.value)}
              value={Designation}
            >
              <option>PROFESSOR</option>
              <option>ASST PROFESSOR</option>
              <option>ASSOCIATE PROFESSOR </option>
              <option>LAB INCHARGE</option>
              <option>OFFICE STAFF</option>
            </select>
          </Organizefront>

          <Organizefront>
            <label>Phone Number</label>
            <input
              type="text"
              onChange={(event) => Handler2(event.target.value)}
              value={Phone}
            />
          </Organizefront>

          <Organizefront>
            <label>Email</label>
            <input
              type="email"
              onChange={(event) => Handler3(event.target.value)}
              value={Email}
            />
          </Organizefront>

          <Organizefront>
            <label>Password</label>
            <input
              type="text"
              onChange={(event) => Handler10(event.target.value)}
              value={password}
            />
          </Organizefront>

          <Organizefront>
            <label>Confirm Password</label>
            <input
              type="text"
              onChange={(event) => Handler11(event.target.value)}
              value={confirmpassword}
            />
          </Organizefront>

          <Organizefront>
            <label>Description</label>

            <Textarea
              className="textarea"
              onChange={(event) => Handler6(event.target.value)}
              value={Description}
            ></Textarea>
          </Organizefront>
        </Organizelayout>

        <button type="submit">Submit</button>
      </Organize>
    </form>
  );
};
export default CreateOrganizer;
