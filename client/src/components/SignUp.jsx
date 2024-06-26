import React from "react";
import styled from "styled-components";
import TextInput from "./TextInput.jsx";
import Button from "./Button.jsx";
import { UserSignUp } from "../api/index.js";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/reducers/userSlice.js";
import { useState } from "react";

const Container = styled.div`
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 36px;
`;
const Title = styled.div`
  font-size: 30px;
  font-weight: 800;
  color: ${({ theme }) => theme.text_primary};
`;
const Span = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary + 90};
`;

const SignUp = () => {
  // Define dispatch function
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Validating for empty field
  const validateInputs = () => {
    if (!name || !email || !password) {
      alert("Please fill in all fields");
      return false;
    }
    return true;
  };

  const handelSignUp = async () => {
    setLoading(true);
    setButtonDisabled(true);
    if (validateInputs()) {
      await UserSignUp({ name, email, password })
        .then((res) => {
          dispatch(loginSuccess(res.data));
          alert("Account created successfully 👩🏼‍💻");
          setLoading(false);
          setButtonDisabled(false);
        })
        .catch((err) => {
          alert(err.response.data.message);
          setLoading(false);
          setButtonDisabled(false);
        });
    }
    else{
      setLoading(false);
          setButtonDisabled(false);
    }
  };
  return (
    <Container>
      <div>
        <Title>Create New Account 💻</Title>
        <Span>Please enter details to create new account</Span>
      </div>
      <div style={{ display: "flex", gap: "20px", flexDirection: "column" }}>
        <TextInput
          label="Full Name"
          placeholder="Enter your full name"
          value={name}
          handelChange={(e) => setName(e.target.value)} />
        <TextInput
          label="Email Address"
          placeholder="Enter your email address"
          value={email}
          handelChange={(e) => setEmail(e.target.value)}
        />
        <TextInput label="Password"
          placeholder="Enter Password" password
          value={password}
          handelChange={(e) => setPassword(e.target.value)} 
          />
        <Button text="SignUp"
          onClick={handelSignUp}
          isLoading={loading}
          isDisabled={buttonDisabled} />
      </div>
    </Container>
  );
};

export default SignUp;
