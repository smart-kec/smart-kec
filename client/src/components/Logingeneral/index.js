import React from 'react'
import { Button } from '../ButtonElements';
import bg from "../../images/bg-1.jpeg";
import { Container, Bg, FormLabel, FormWrap, FormContent, Form, FormH1, FormInput, Links, Select } from './LogingeneralElements'

const Login = () => {
  return (
    <>
        <Container>
        <Bg imgUrl={bg}>
            <FormWrap>
                <FormContent>
                    <Form action="#">
                        <FormH1>Sign in to your account</FormH1>
                        <Select name='type'>
                            <option value="student">Student</option>
                            <option value="organiser">Organiser</option>
                            <option value="department">Department</option>
                            <option value="lab-hall">Lab/Hall</option>
                        </Select>
                        <FormLabel htmlFor='for'>Email</FormLabel>
                        <FormInput type='email' required />
                        <FormLabel htmlFor='for'>Password</FormLabel>
                        <FormInput type='password' required />
                        <Button to="/" primary="true" dark="true">Continue</Button>
                        <Links to="/">Forgot Password?</Links>
                    </Form>
                </FormContent>
            </FormWrap>
        </Bg>
        </Container>
    </>
  )
}

export default Login;