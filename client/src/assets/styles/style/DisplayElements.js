import styled from "styled-components";
export const Details = styled.div`
  background-color: #f1f6f5;
  padding: 2rem;

  text-align: center;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.25);
`;
export const Detailsfront = styled.div`
  #img {
    float: left;
    padding-top: 0rem;
    padding-right: 1rem;

    font-size: 15px;
    margin-bottom: 0.5rem;
    display: block;

    width: 55px;
    height: 40px;
  }
  #inputbox {
    
  }

  & p {
    padding: 0.5rem;
    border-radius: 6px;
    font-family: Tinos;
    font-size: 1.5rem;
    font-weight: bold;
    width: 28rem;
    max-width: 100%;

    @media (max-width: 768px) {
      font-size: 1.2rem;
      width: 17rem;
    }
    @media (max-width: 320px) {
      width: max-content;
    }
  }
  & h6 {
    font-size: 24px;
    font-family: Changa;
    padding-left: 4rem;
    margin-bottom: 2rem;
    color: #0500fe;
    max-width: 100%;

    @media (max-width: 768px) {
      width: auto;
      font-size: 1.1rem;
      padding-left: 0rem;
      text-align: center;
    }
  }

  & button {
    width: 2rem;
    height: 2rem;
  }

  #gen {
    position: relative;
    top: -2.1rem;
    left: 19rem;
    @media (max-width: 768px) {
      left: 12.3rem;
    }
  }

  #space {
    padding-top: 2.2rem;
  }
`;

export const Detailslayout = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-gap: 4rem;
  row-gap: 3rem;

  text-align: left;
  @media (max-width: 480px) {
    margin-bottom: 17rem;
  }
  @media (min-width: 768px) {
    margin-left: 10rem;
  }
`;

export const Box = styled.div`
  background-color: #000;
  padding: 2rem 2rem 0rem 2rem;
  margin: 0%;
  display: flex;
  flex-wrap: wrap;
  column-gap: 4rem;
  row-gap: 2rem;
  padding-left: 5rem;

  @media (min-width: 871px) {
    height: 15rem;
  }

  & h1 {
    padding-top: 1.5rem;
    font-weight: 400;
    font-family: sanchez;
    color: red;
    @media (max-width: 768px) {
      font-size: 1.3rem;
    }
  }

  #be {
    position: relative;
    top: -5.5rem;
    left: 9.2rem;
    color: red;
    font-weight: 400;
    font-family: sanchez;

    @media (max-width: 768px) {
      left: 0%;
      top: -3rem;
      margin-top: 3rem;
    }
  }

  & button {
    position: relative;
    top: -3rem;
    height: 3rem;
    width: 12rem;
    border: 2px solid aqua;
    color: #fff;
    background-color: black;
    border-radius: 20px;
    font-weight: bold;
    font-size: 18px;
    cursor: pointer;
    @media (min-width: 1150px) {
      position: relative;
      left: 19rem;
    }
  }
  #one {
    position: relative;
    top: 0.3rem;
    left: 1.1rem;
    width: 100px;
    height: 100px;
  }

  #two {
    position: absolute;
    width: 135px;
    height: 135px;
    color: #18eaf880;
    top: 1.2rem;
  }

  #three {
    position: relative;
    left: -3rem;
    width: 50px;
    height: 75px;
    color: #fff;
    @media (max-width: 835px) {
      display: none;
    }
  }

  #four {
    position: relative;
    height: 100px;
    width: 400px;
    left: 10.3rem;
  }
`;

export const Wrapper = styled.div`
  display: inline-block;
  position: relative;

  input[type="file"] {
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
`;
export const Bt = styled.div`
  pointer-events: none;
  opacity: 1;
  line-height: 90px;
  text-align: center;

  #one {
    position: relative;
    top: 0.3rem;
    left: 1.1rem;
    width: 100px;
    height: 100px;
  }
`;
