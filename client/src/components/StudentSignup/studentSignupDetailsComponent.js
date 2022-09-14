import React, { useState } from "react";
import bg from "../../assets/images/bg-1.jpeg";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Bg,
  FormLabel,
  FormWrap,
  FormContent,
  Form,
  FormH1,
  FormInput,
  FormButton,
  Select,
} from "../../assets/styles/style/SignupElements";

const generateArrayOfYears = () => {
  const max = new Date().getFullYear();
  const min = max + 9;
  const years = [];
  for (let i = max; i <= min; i++) {
    years.push(i);
  }
  return years;
};
const years = generateArrayOfYears();

const validate = (values) => {
  console.log("validate");
  let errors = {};

  if (
    !/([a-zA-Z]+)[.]([0-9]+)([a-z0-9]+)@kongu([.])edu/i.test(values.studemail)
  ) {
    errors.studemail = "Email address is invalid";
  }

  if (values.phone.length !== 10) {
    errors.phone = "Phone Numbers should have 10";
  }

  if (values.password.length < 8) {
    errors.password = "Password needs to be atleat 8 characters";
  } else if (values.password.length > 100) {
    errors.password = "Password should not exceed 100 characters";
  }
  if (values.password.search(/[a-z]/) < 0) {
    errors.password = "Should contain a lowercase";
  }
  if (values.password.search(/[A-Z]/) < 0) {
    errors.password = "Should contain an uppercase";
  }
  if (values.password.search(/[0-9]/i) < 0) {
    errors.password = "Should contain a number";
  }

  // if (values.password!="^(?=.*[a-z])(?=.*[A-Z])(?=.*d)[a-zA-Zd]{8,}$") {
  //   errors.password =
  //     "Not strong enough(Atleast 1 uppercase,1 lowercase and 1 number)";
  // }

  if (values.password2 !== values.password) {
    errors.password2 = "Passwords do not match";
  }

  return errors;
};
/* eslint-disable */

const Signup = () => {
  // STATE
  const navigate = useNavigate();
  const stdEmail = useSelector((state) => state.data);
  React.useEffect(() => {
    if (stdEmail === "nill") {
      navigate("/signup/email");
    }
  });
  const [values, setValues] = useState({
    studname: "",
    studrollno: "",
    studemail: "",
    programme: "",
    branch: "",
    sem: "",
    graduationYear: "",
    gender: "",
    phone: "",
    hack_id: "",
    password: "",
    password2: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("validate", name, value);
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitted");
    setErrors(validate(values));
    console.log(values);

    //FIXME: VALIDATE AND SUBMIT

    // if( setErrors(validate(values))){
    // console.log(values);
    // }
  };

  const sendData = async () => {
    try {
    } catch (error) {
      alert("Error! Try Again after some time");
      navigate(`/signup/email`);
      console.log(error);
    }
  };
  return (
    <>
      <Container>
        <Bg imgUrl={bg}>
          <FormWrap>
            <FormContent>
              <Form action="#" onSubmit={handleSubmit}>
                <FormH1>Create an Account</FormH1>
                <FormLabel htmlFor="for">Name</FormLabel>
                <FormInput
                  type="text"
                  name="studname"
                  value={values.studname}
                  onChange={handleChange}
                  required
                />
                <div>
                  {errors.studname && (
                    <p style={{ color: "red" }}>{errors.studname}</p>
                  )}
                </div>

                <FormLabel htmlFor="for">Roll No.</FormLabel>
                <FormInput
                  type="text"
                  name="studrollno"
                  value={values.studrollno}
                  onChange={handleChange}
                  required
                />
                {errors.studrollno && (
                  <p style={{ color: "red" }}>{errors.studrollno}</p>
                )}

                <FormLabel htmlFor="for">Email</FormLabel>
                <FormInput
                  type="email"
                  name="studemail"
                  value={stdEmail}
                  onChange={handleChange}
                  readOnly
                />
                {errors.studemail && (
                  <p style={{ color: "red" }}>{errors.studemail}</p>
                )}

                <FormLabel htmlFor="for">Programme</FormLabel>
                <Select name="programme">
                  <option value="be">B.E</option>
                  <option value="btech">B.Tech</option>
                  <option value="me">M.E</option>
                  <option value="bsc">B.Sc</option>
                  <option value="msc">M.Sc</option>
                  <option value="mba">MBA</option>
                  <option value="mca">MCA</option>
                </Select>

                <FormLabel htmlFor="for">Branch</FormLabel>
                <Select name="branch">
                  <option value="cse">CSE</option>
                  <option value="it">IT</option>
                  <option value="ece">ECE</option>
                  <option value="eee">EEE</option>
                  <option value="eie">EIE</option>
                  <option value="mech">Mech</option>
                  <option value="mts">MTS</option>
                  <option value="civil">Civil</option>
                  <option value="auto">Auto</option>
                  <option value="chem">Chem</option>
                  <option value="ft">FT</option>
                  <option value="csd">CSD</option>
                  <option value="ai">AI</option>
                  <option value="ct-ug">CT-UG</option>
                  <option value="ct-pg">CT-PG</option>
                </Select>

                <FormLabel htmlFor="for">Semester</FormLabel>
                <Select name="sem">
                  <option value="i">I</option>
                  <option value="ii">II</option>
                  <option value="iii">III</option>
                  <option value="iv">IV</option>
                  <option value="v">V</option>
                  <option value="vi">VI</option>
                  <option value="vii">VII</option>
                  <option value="viii">VIII</option>
                </Select>

                <FormLabel htmlFor="for">Graduation Year</FormLabel>
                <Select name="graduationYear">
                  {years.map((year) => {
                    return (
                      <option value={year} key={year}>
                        {year}
                      </option>
                    );
                  })}
                </Select>

                <FormLabel htmlFor="for" name="gender">
                  Gender
                </FormLabel>
                <FormLabel>
                  <div
                    style={{
                      display: "flex",
                      "flex-direction": "row",
                      "justify-content": "space-around",
                    }}
                  >
                    <div>
                      <FormInput
                        type="radio"
                        value="male"
                        name="gender"
                        checked={values.gender == "male"}
                        onChange={handleChange}
                      />
                      Male
                    </div>
                    <div>
                      <FormInput
                        type="radio"
                        value="female"
                        name="gender"
                        checked={values.gender == "female"}
                        onChange={handleChange}
                      />
                      Female
                    </div>
                  </div>
                </FormLabel>

                <FormLabel htmlFor="for">Phone no</FormLabel>
                <FormInput
                  type="text"
                  name="phone"
                  value={values.phone}
                  onChange={handleChange}
                  required
                />
                {errors.phone && <p style={{ color: "red" }}>{errors.phone}</p>}

                <FormLabel htmlFor="for">Hackerrank Id</FormLabel>
                <FormInput
                  type="text"
                  name="hack_id"
                  value={values.hack_id}
                  onChange={handleChange}
                  required
                />
                {errors.hack_id && (
                  <p style={{ color: "red" }}>{errors.hack_id}</p>
                )}

                <FormLabel htmlFor="for">Password</FormLabel>
                <FormInput
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  required
                />
                {errors.password && (
                  <p style={{ color: "red" }}>{errors.password}</p>
                )}

                <FormLabel htmlFor="for">Confirm Password</FormLabel>
                <FormInput
                  type="password"
                  name="password2"
                  value={values.password2}
                  onChange={handleChange}
                  required
                />
                {errors.password2 && (
                  <p style={{ color: "red" }}>{errors.password2}</p>
                )}

                <FormButton
                  to="/"
                  primary="true"
                  dark="true"
                  onClick={sendData}
                >
                  Submit
                </FormButton>
              </Form>
            </FormContent>
          </FormWrap>
        </Bg>
      </Container>
    </>
  );
};

export default Signup;
