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
import { getBranchListForSignup } from "../../api/AurthenticationServices";

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
  let errors = {};
  // const regEx = /([a-zA-Z]+)[.]([0-9]+)([a-z0-9]+)@kongu([.])edu/;
  // if (!regEx.test(values.studemail)) {
  //   errors.studemail = "Email address is invalid";
  // }

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
  const [visible, setVisible] = useState(false);
  const [values, setValues] = useState({
    studname: "",
    studrollno: "",
    studemail: "",
    branch: "",
    sem: "",
    graduationYear: "",
    gender: "",
    phone: "",
    hack_id: "",
    password: "",
    password2: "",
    fathername: "",
    mothername: "",
    address: "",
    fatherphone: "",
    motherphone: "",
    stayin: "",
  });
  const [errors, setErrors] = useState({});
  //Programme and branch
  let [branchValue, setBranch] = useState([
    {
      _id: "1",
      aliasName: "Choose Programme",
      programme: "choose programme",
    },
  ]);

  const [programme, setProgramme] = useState({});
  const changeProgrammeSelectOptionHandler = async (event) => {
    setProgramme(event.target.value);

    try {
      // dispatch(loadingPage(true));
      const res = await getBranchListForSignup({
        programme: event.target.value,
      });

      // const msg = res.data.message;
      const status = res.data.STATUS;
      if (status === "success") {
        // setBranch(res.data.data);
        setBranch(res.data.data);
        // dispatch(loadingPage(false));
      }
    } catch (err) {
      // dispatch(loadingPage(false));
      alert("Try Again after some time");
      console.log(err);
    }
  };

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
      dispatch(loadingPage(true));
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
                <Select
                  name="programme"
                  onChange={changeProgrammeSelectOptionHandler}
                  value={programme}
                  // onChange={handleBranch}
                  // value={values.programme}
                  // onChange={(event) => Handler9(event.target.value)}
                  // value={programme}
                >
                  <option value="1">Choose...</option>
                  <option value="BE">BE</option>
                  <option value="BTech">BTech</option>
                  <option value="ME">M.E</option>
                  <option value="BSc">B.Sc</option>
                  <option value="MSc">M.Sc</option>
                  <option value="MBA">MBA</option>
                  <option value="MCA">MCA</option>
                </Select>

                <FormLabel htmlFor="for">Branch</FormLabel>
                <Select name="branch">
                  {branchValue.map(function (dept) {
                    return <option value={dept._id}>{dept.aliasName}</option>;
                  })}
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

                <FormLabel htmlFor="for" name="stayin">
                  Stay In
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
                        value="0"
                        name="stayin"
                        onChange={handleChange}
                        onClick={() => setVisible(false)}
                      />
                      Dayschollar
                    </div>
                    <div>
                      <FormInput
                        type="radio"
                        value="1"
                        name="stayin"
                        onChange={handleChange}
                        onClick={() => setVisible(true)}
                      />
                      Hosteller
                    </div>
                  </div>
                  {visible && (
                    <div>
                      <FormLabel htmlFor="for">Hostel Name</FormLabel>

                      <Select
                        name="sem"
                        style={{
                          marginTop: "20px",
                          paddingRight: "240px",

                          border: "none",
                          borderradius: "4px",
                        }}
                      >
                        <option value="Ponnar">Ponnar</option>
                        <option value="Dheeran">Dheeran</option>
                        <option value="Kanban">Kanban</option>
                        <option value="Bharathi">Bharathi</option>
                        <option value="Vaigai">Vaigai</option>
                      </Select>
                    </div>
                  )}
                </FormLabel>
                <FormLabel htmlFor="for">FatherName</FormLabel>
                <FormInput
                  type="text"
                  name="studname"
                  value={values.fathername}
                  onChange={handleChange}
                  required
                />
                <FormLabel htmlFor="for">MotherName</FormLabel>
                <FormInput
                  type="text"
                  name="studname"
                  value={values.mothername}
                  onChange={handleChange}
                  required
                />
                <FormLabel htmlFor="for">Father Ph.No</FormLabel>
                <FormInput
                  type="text"
                  name="studname"
                  value={values.fatherphone}
                  onChange={handleChange}
                  required
                />
                <FormLabel htmlFor="for">Mother Ph.No</FormLabel>
                <FormInput
                  type="text"
                  name="studname"
                  value={values.motherphone}
                  onChange={handleChange}
                  required
                />
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
