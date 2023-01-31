import styled from "styled-components";
export const Organize = styled.div`
  background-color: #fff;
  padding: 2rem;
  
  margin : auto;
  width: 50rem;
  max-width: 95%;
  //  border-radius: 12px; 
  text-align: center;
  //  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.25); 


  & button {
    width: 270px;
    height: 50px;
    padding: 10px;
    border: #fff;
    background-color: rgb(46, 210, 207);
    color: white;
    border-radius: 5px;
    font-weight: bold;
    font-size: 18px;
    cursor: pointer;
    margin-top: 15px;
    margin-bottom: 30px;

    margin-left: 1rem;
  }

  & button:hover,
  & button:active {
    background-color: #510674;
    border-color: #510674;
  }

  & button.alternative {
    color: #220131;
    border-color: transparent;
    background-color: transparent;
  }

  & button.alternative:hover,
  & button.alternative:active {
    background-color: #ddb3f8;
  }
`;

export const Organizelayout = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-gap: 6rem;
  row-gap: 3rem;
  margin-bottom: 1rem;
  text-align: left;
`;

export const Organizefront = styled.div`
  & label {
    font-size: 15px;
    margin-bottom: 0.5rem;
    display: block;
  }

  & input {
    padding: 0.5rem;
    border-radius: 6px;
    border: 1px solid #ccc;
    width: 20rem;
    max-width: 100%;
  }
  & select {
    text-align: center;
    padding: 0.5rem;
    border-radius: 6px;
    border: 1px solid #ccc;
    width: 20rem;
    max-width: 100%;
  }
`;


export const Textarea = styled.textarea`
  height:5rem;
  border-radius: 8px;
  border: 0.1rem solid #ccc;
  width : 50vw;
  margin : auto;
  
`;
