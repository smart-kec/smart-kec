import styled from 'styled-components'

export const App = styled.div`
    display: flex;
    flex-direction: column;
    justify-Content: center;
    align-items: center;
    background-color: black;
    height: 100vh;
`

export const Head = styled.h1`
    color: white;
    padding: 10px;
`

export const Con = styled.div`
    margin-top: 20px;
    box-shadow: 0 4x 8px 0 rgba(0, 0, 0, 0.2), 0 6px;
    padding: 50px 100px;
    background-color: white;
    border-radius: 20px;
`

export const Message = styled.p`
    text-align: center;
    font-size: 20px;
    padding-top: 10px;
`

export const Label = styled.label`
    font-size: 18px;
    font-weight: bold;
    padding-bottom: 15px;
`

export const Buttone = styled.button`
    text-align: center;
    padding: 10px;
    border: none;
    background-color: #4fffe7;
    border-radius: 30px;
`

export const Input1 = styled.input`
    width: 100%;
    padding: 10px;
    margin: 5px 0;
    border: none;
    border-bottom: 1px solid #000;
    background-color: white;
    outline: none;
    font-size: 6;
    box-sizing: border-box;
`