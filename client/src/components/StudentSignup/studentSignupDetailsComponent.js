import React from "react";
import useForm from "./useForm";
import validate from './validateInfo'
// import { Button } from "./ButtonElements";
import bg from "../../assets/images/bg-1.jpeg";
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
// console.log(years);


const Signup = () => {
  const {handleChange,values,handleSubmit} = useForm(validate);


  return (
    <>
      <Container>
        <Bg imgUrl={bg}>
          <FormWrap>
            <FormContent>
              <Form action="#" onSubmit={handleSubmit}>
                <FormH1>Create an Account</FormH1>
                <FormLabel htmlFor="for">Name</FormLabel>
                <FormInput type="text" name="studname" 
                value={values.studname} 
                onChange={handleChange}
                required />

                <FormLabel htmlFor="for">Roll No.</FormLabel>
                <FormInput type="text" name="studrollno"
                value={values.studrollno} 
                onChange={handleChange}
                required />

                <FormLabel htmlFor="for">Email</FormLabel>
                <FormInput type="email" name="studemail" 
                value={values.studemail} 
                onChange={handleChange}
                required />

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
                
                <Select name="graduationYear">
                  {years.map((year) => {
                    return (
                      <option value={year} key={year}>
                        {year}
                      </option>
                    );
                  })}
                </Select>

                <FormLabel htmlFor="for" name="gender">Gender</FormLabel>
                <FormLabel>
                <FormInput type="radio" name="male" />Male    
                <FormInput type="radio" name="female"/>Female
                </FormLabel>

                <FormLabel htmlFor="for">Phone no</FormLabel>
                <FormInput type="text" name="phone" 
                value={values.phone} 
                onChange={handleChange}
                required />

                <FormLabel htmlFor="for">Hackerrank Id</FormLabel>
                <FormInput type="text" name="hack_id" 
                value={values.hack_id} 
                onChange={handleChange}
                required />

                <FormLabel htmlFor="for">Password</FormLabel>
                <FormInput type="password" name="password"
                value={values.password} 
                onChange={handleChange}
                required />

                <FormLabel htmlFor="for">Confirm Password</FormLabel>
                <FormInput type="password" name="password2" 
                value={values.password2} 
                onChange={handleChange}
                required />

                <FormButton to="/" primary="true" dark="true">
                  Continue
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
