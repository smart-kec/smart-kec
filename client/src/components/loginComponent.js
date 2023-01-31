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
  Links,
  Select,
  FormButton,
  Option
} from "../assets/styles/style/LoginElements";

const Login = () => {
  return (
    <>
      <Container>
        <Bg imgUrl={bg}>
          <FormWrap>
            <FormContent>
              <Form action="#">
                <FormH1>Sign in to your account</FormH1>
                <Select name="type">
<<<<<<< HEAD
                  <option value="student">Student</option>
                  <option value="Employee">organizer</option>
                  
=======

                  <Option value="student">Student</Option>
                  <Option value="organiser">Organiser</Option>
                  <Option value="department">Department</Option>
                  <Option value="lab-hall">Lab/Hall</Option>

>>>>>>> ac74486da24a743bf7b9fb188951f6747287b592
                </Select>
                <FormLabel htmlFor="for">Email</FormLabel>
                <FormInput type="email" required />
                <FormLabel htmlFor="for">Password</FormLabel>
                <FormInput type="password" required />
                {/* <Button to="/" primary="true" dark="true">
                  Continue
                </Button> */}
                <FormButton type="submit" to="/" primary="true" dark="true">Continue</FormButton>
                <Links to="/">Forgot Password?</Links>
              </Form>
            </FormContent>
          </FormWrap>
        </Bg>
      </Container>
    </>
  );
};

export default Login;
