import React from 'react'
import { FormLabel, FormWrap, Icon } from './SignupElements'

const SignUp = () => {
  return (
    <>
        <Container>
            <FormWrap>
                <Icon to='/'>Smart_KEC</Icon>
                <FormContent>
                    <Form action="#">
                        <FormH1>Student Signup</FormH1>
                        <FormLabel htmlFor='for'>Email</FormLabel>
                        <FormInput type='email' required />
                        <FormLabel htmlFor='for'>Password</FormLabel>
                        <FormInput type='password' required /> 
                    </Form>
                </FormContent>
            </FormWrap>
        </Container>
    </>
  )
}

export default SignUp