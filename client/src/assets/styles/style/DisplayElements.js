import styled from "styled-components";
export const Details = styled.div`
  background-color: #f1f6f5;
  padding: 2rem;
  margin: auto;
  width: 90rem;
  max-width: 120%;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.25);
`;
export const Detailsfront = styled.div`
  & img {
    float: left;
    padding-top: 0rem;
    padding-right: 1rem;

    font-size: 15px;
    margin-bottom: 0.5rem;
    display: block;

    width: 60px;
    height: 45px;
  }

  & p {
    padding: 0.5rem;
    border-radius: 6px;

    font-size: 1.6rem;
    font-weight: bold;
    width: 40rem;
    max-width: 100%;
  }
  & h6 {
    font-size: 23px;
    padding-left: 15rem;
    margin-bottom: 2rem;
    color: #0500fe;
    max-width: 100%;
  }
`;

export const Detailslayout = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-gap: 6rem;
  row-gap: 3rem;
  margin-bottom: 1rem;
  text-align: left;
`;

export const Box = styled.div`
  background-color: #000;
  padding: 2rem 2rem 0rem 2rem;
  margin: auto;
  width: 90rem;
  max-width: 95%;
  border-radius: 12px;
    display: flex;
  flex-wrap: wrap;
  column-gap: 4rem;
  row-gap: 2rem;
  color: #fff;

  & h1{
    padding-top: 1.5rem;
  font-weight: 400;
  font-family: sanchez;
  color: red;
  
  }

  & button{
    height: 3rem;
    width: 10rem;
    margin-left:76rem ; 
    color: black;
    background-color: aqua;
    border-radius: 20px;
    font-weight: bold;
    font-size: 18px;
    cursor: pointer;
  }

  #one{
    position: relative;
    top: 0.3rem;
    left: 1.1rem;
    width: 100px;
    height: 100px;
  }
  #two{
    position: absolute;
    width: 135px;
    height: 135px;
    
    top: 1.2rem;
  }
  
  #three{
   
   position: relative;
   left: -3rem;
    width: 70px;
    height: 70px;
  
  }
  
  #four{
    position: relative;
    height: 100px;
    width: 400px;
    left: 10.3rem;
    
  }
    
  `;
