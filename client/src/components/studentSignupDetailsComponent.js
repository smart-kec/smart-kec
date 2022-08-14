import React from "react";
import { Button } from "./ButtonElements";
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
  Links,
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
                <Select name="programme">
                  <option value="be">B.E</option>
                  <option value="btech">B.Tech</option>
                  <option value="me">M.E</option>
                  <option value="bsc">B.Sc</option>
                  <option value="msc">M.Sc</option>
                </Select>
                <Select name="programme">
                  <option value="cse">CSE</option>
                  <option value="it">IT</option>
                  <option value="msc">ECE</option>
                  <option value="msc">EEE</option>
                  <option value="msc">EIE</option>
                  <option value="me">Mech</option>
                  <option value="me">MTS</option>
                  <option value="bsc">Civil</option>
                  <option value="msc">Auto</option>
                  <option value="msc">Chem</option>
                  <option value="msc">FT</option>
                  <option value="msc"></option>
                  <option value="msc"></option>
                </Select>
                <FormLabel htmlFor="for">Password</FormLabel>
                <FormInput type="password" required />
                <Button to="/" primary="true" dark="true">
                  Continue
                </Button>
                <Links to="/">Forgot Password?</Links>
              </Form>
            </FormContent>
          </FormWrap>
        </Bg>
      </Container>
    </>
  );
};

export default Signup;
