import React from "react";
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
  Links,
} from "../assets/styles/style/AdminLoginElements";

const AdminLogin = () => {
  return (
    <>
      <Container>
        <Bg imgUrl={bg}>
          <FormWrap>
            <FormContent>
              <Form action="#">
                <FormH1> Sign in to your account </FormH1>
                <FormLabel htmlFor="for"> Email </FormLabel>
                <FormInput type="email" required />
                <FormLabel htmlFor="password"> Password </FormLabel>
                <FormInput type="password" required />
                <FormButton to="/" primary="true" dark="true">
                  
                  Continue
                </FormButton>
                <Links to="/"> Forgot Password ? </Links>
              </Form>
            </FormContent>
          </FormWrap>
        </Bg>
      </Container>
    </>
  );
};

export default AdminLogin;
