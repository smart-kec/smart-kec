import React from "react";
import { Button } from "./ButtonElements";
import bg from "../../../images/bg-1.jpeg";
import {
  Container,
  Bg,
  FormLabel,
  FormWrap,
  Icon,
  FormContent,
  Form,
  FormH1,
  FormInput,
  Links,
} from "./AdminLoginElements";

const AdminLogin = () => {
  return (
    <>
      <Container>
        <Bg imgUrl={bg}>
          <FormWrap>
            <Icon to="/"> Smart_KEC </Icon>{" "}
            <FormContent>
              <Form action="#">
                <FormH1> Sign in to your account </FormH1>{" "}
                <FormLabel htmlFor="for"> Email </FormLabel>{" "}
                <FormInput type="email" required />
                <FormLabel htmlFor="for"> Password </FormLabel>{" "}
                <FormInput type="password" required />
                <Button to="/" primary="true" dark="true">
                  {" "}
                  Continue{" "}
                </Button>{" "}
                <Links to="/"> Forgot Password ? </Links>{" "}
              </Form>{" "}
            </FormContent>{" "}
          </FormWrap>{" "}
        </Bg>{" "}
      </Container>{" "}
    </>
  );
};

export default AdminLogin;
