import React from "react";
// import { Button } from "./ButtonElements";
import bg from "../assets/images/bg-1.jpeg";
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
  // Links,
  Radio,
  RadioInput,
  Select,
} from "../assets/styles/style/SignupElements";


const Signup = () => {
  return (
    <>
      <Container>
        <Bg imgUrl={bg}>
          <FormWrap>
            <FormContent>
              <Form action="#">
                <FormH1>Create an Account</FormH1>
                <FormLabel htmlFor="for">Name</FormLabel>
                <FormInput type="text" name="studname" required />

                <FormLabel htmlFor="for">Roll No.</FormLabel>
                <FormInput type="text" name="studrollno" required />

                <FormLabel htmlFor="for">Email</FormLabel>
                <FormInput type="email" name="studemail" required />

                <FormLabel htmlFor="for">Programme</FormLabel>
                <Select name="programme">
                  <option value="be">B.E</option>
                  <option value="btech">B.Tech</option>
                  <option value="me">M.E</option>
                  <option value="bsc">B.Sc</option>
                  <option value="msc">M.Sc</option>
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
                  <option value="mba">MBA</option>
                  <option value="mca">MCA</option>
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

                <FormLabel htmlFor="for">Gender</FormLabel>
                <Radio name="gender">
                  <Radio value="male">Male</Radio>
                  <option value="female">Female</option>
                </Radio>

                <FormLabel htmlFor="for">Phone no</FormLabel>
                <FormInput type="text" name="phone" required />

                <FormLabel htmlFor="for">Hackerrank Id</FormLabel>
                <FormInput type="text" name="hack-id" required />

                <FormLabel htmlFor="for">Password</FormLabel>
                <FormInput type="password" required />

                <FormLabel htmlFor="for">Confirm Password</FormLabel>
                <FormInput type="password" required />

                <FormButton to="/" primary="true" dark="true">
                  Continue
                </FormButton>
                {/* <Links to="/">Forgot Password?</Links> */}
              </Form>
            </FormContent>
          </FormWrap>
        </Bg>
      </Container>
    </>
  );
};

export default Signup;
