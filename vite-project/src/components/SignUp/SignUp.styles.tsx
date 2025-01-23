import styled from "styled-components";

export const SignUpBox = styled.div`
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50vw;
    max-width: 500px;
    min-width: 300px;
    border: 2px solid #62bb46;
    background-color: white;
    display: flex;
    flex-direction: column;
    padding: 20px;
    box-shadow: 0 0 100px 0 rgb(98, 187, 70, 0.5);
    justify-content: center;
`;

export const SignUpFields = styled.form`
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 100%;
    gap: 20px;
    align-items: end;
`;

export const SignUpGroup = styled.div`
  position: relative;
  padding: 15px 0 0;
  margin-top: 10px;
  width: 100%;
`;

export const SignUpField = styled.input`
  font-family: inherit;
  width: 100%;
  border: 0;
  border-bottom: 2px solid gray;
  outline: 0;
  font-size: 1.3rem;
  color: black;
  padding: 7px 0;
  background: transparent;
  transition: border-color 0.2s;

  &::placeholder {
    color: transparent;
  }

  &:placeholder-shown ~ label {
    font-size: 1.3rem;
    cursor: text;
    top: 20px;
  }

  &:focus {
    padding-bottom: 6px;
    font-weight: 700;
    border-width: 3px;
    border-image: linear-gradient(to right, #00a1e0, #00a1e0);
    border-image-slice: 1;

    ~ label {
      position: absolute;
      top: 0;
      display: block;
      transition: 0.2s;
      font-size: 1rem;
      color: #00a1e0;
      font-weight: 700;
    }
  }

  &:required,
  &:invalid {
    box-shadow: none;
  }
`;

export const LoginLabel = styled.label`
  position: absolute;
  top: 0;
  display: block;
  transition: 0.2s;
  font-size: 1rem;
  color: gray;
`;

export const LoginButton = styled.button`
    background-color: #62bb46;
    color: white;
    border: 0;
    font-weight: bold;
    padding: 5px;
    padding-inline: 20px;
    cursor: pointer;
    font-size: 1em;
`;