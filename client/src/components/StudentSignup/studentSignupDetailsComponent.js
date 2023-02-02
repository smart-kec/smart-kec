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
import {
  sendStudentDetailsSignup,
  getBranchListForSignup,
  getSemListForSignup,
} from "../../api/AurthenticationServices";

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

  let [semNoValue, setSemNoValue] = useState(["Choose Branch"]);
  let [yearNoValue, setYearNoValue] = useState(["Choose Branch"]);
  const [programme, setProgramme] = useState({});
  const [branch, setBranchValue] = useState({});
  const [semNo, setSemNo] = useState({});
  const [yearNo, setYearNo] = useState({});
  const [graduationYear, setGraduationYear] = useState({});
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

  const changeBranchSelectOptionHandler = async (event) => {
    console.log("ID ", event.target.value);
    setBranchValue(event.target.value);

    const arrayRange = (start, stop, step) =>
      Array.from(
        { length: (stop - start) / step + 1 },
        (value, index) => start + index * step
      );

    try {
      // dispatch(loadingPage(true));
      const res = await getSemListForSignup({
        deptID: event.target.value,
      });
      console.log(res.data.data);
      // const msg = res.data.message;
      const status = res.data.STATUS;
      if (status === "success") {
        // Need to generate range of values

        setSemNoValue(arrayRange(1, res.data.data.noOfSemesters, 1));
        setYearNoValue(arrayRange(1, res.data.data.courseDuration, 1));
        // dispatch(loadingPage(false));
      }
    } catch (err) {
      // dispatch(loadingPage(false));
      alert("Try Again after some time");
      console.log(err);
    }
  };

  const changeSemNoValue = (event) => {
    setSemNo(event.target.value);
  };
  const changeYearNoValue = (event) => {
    setYearNo(event.target.value);
  };
  const handleChangeGraduationYear = (event) => {
    setGraduationYear(event.target.value);
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
      // dispatch(loadingPage(true));
      if (values.password === values.password2) {
        errors.password2 = "";
        const data = {
          userEmail: stdEmail,
          userType: "Student",
          userPassword: values.password,
          studentName: values.studname,
          studentRollNo: values.studrollno,
          stdprogramme: programme,
          stdDeptId: branch,
          stdSemNo: semNo,
          stdyearOfStudy: yearNo,
          stdgraduationYear: graduationYear,
          stdgender: values.gender,
          stdPhoneNumber: values.phone,
          stdHackerRankId: values.hack_id,
          stayIn: values.stayin,
          fatherName: values.fathername,
          motherName: values.mothername,
          fatherPhnNumber: values.fatherphone,
          motherPhnNumber: values.motherphone,
        };
        console.log(data);
        const res = await sendStudentDetailsSignup(data);
        console.log(res.data);
        if (res.data.status === "success") {
          alert(res.data.message);
          navigate(`/`);
        }
      } else {
        errors.password2 = "Confirm Password doesn't match";
      }
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
                <Select
                  name="branch"
                  onChange={changeBranchSelectOptionHandler}
                  onClick={changeBranchSelectOptionHandler}
                  value={branch}
                >
                  {branchValue.map(function (dept) {
                    return <option value={dept._id}>{dept.aliasName}</option>;
                  })}
                </Select>

                <FormLabel htmlFor="for">Semester No</FormLabel>
                <Select name="sem" onChange={changeSemNoValue} value={semNo}>
                  {semNoValue.map(function (data) {
                    return <option value={data}>{data}</option>;
                  })}
                </Select>

                <FormLabel htmlFor="for">Year of Study</FormLabel>
                <Select name="year" onChange={changeYearNoValue} value={yearNo}>
                  {yearNoValue.map(function (data) {
                    return <option value={data}>{data}</option>;
                  })}
                </Select>

                <FormLabel htmlFor="for">Graduation Year</FormLabel>
                <Select
                  name="graduationYear"
                  onChange={handleChangeGraduationYear}
                  value={graduationYear}
                >
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
                        value="Male"
                        name="gender"
                        checked={values.gender == "Male"}
                        onChange={handleChange}
                      />
                      Male
                    </div>
                    <div>
                      <FormInput
                        type="radio"
                        value="Female"
                        name="gender"
                        checked={values.gender == "Female"}
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
                        value="DayScholar"
                        name="stayin"
                        onChange={handleChange}
                        checked={values.stayin == "DaySchollar"}
                        onClick={() => setVisible(false)}
                      />
                      Dayschollar
                    </div>
                    <div>
                      <FormInput
                        type="radio"
                        value="Hosteller"
                        name="stayin"
                        onChange={handleChange}
                        checked={values.stayin == "Hosteller"}
                        onClick={() => setVisible(true)}
                      />
                      Hosteller
                    </div>
                  </div>
                  {visible && (
                    <div>
                      <FormLabel htmlFor="for">Hostel Name</FormLabel>

                      <Select
                        name="hostelName"
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
                  name="fathername"
                  value={values.fathername}
                  onChange={handleChange}
                  required
                />
                <FormLabel htmlFor="for">MotherName</FormLabel>
                <FormInput
                  type="text"
                  name="mothername"
                  value={values.mothername}
                  onChange={handleChange}
                  required
                />
                <FormLabel htmlFor="for">Father Ph.No</FormLabel>
                <FormInput
                  type="text"
                  name="fatherphone"
                  value={values.fatherphone}
                  onChange={handleChange}
                  required
                />
                <FormLabel htmlFor="for">Mother Ph.No</FormLabel>
                <FormInput
                  type="text"
                  name="motherphone"
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
