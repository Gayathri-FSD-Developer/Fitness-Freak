import React, { useState } from 'react';
import styled from 'styled-components';
import bgImage from '../utils/Images/pexels-leonardho-1552249.jpg';
import custmImage from '../utils/Images/5114865.jpg';
import { createGlobalStyle } from 'styled-components';
import TextInput from '../components/TextInput.jsx';
import Button from "../components/Button.jsx";
import { ContactUs } from '../api/index.js';

// Importing Google Font
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
`;

const Container = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  width: 100%; // Fixed typo here
  height: 100%;
  padding: 20px 10px;
  overflow-y: scroll;
  // background-color:#A78DA5;
`;

const Wrapper = styled.div`
  flex: 1;
  max-width: 1400px;
  display: flex;
  flex-direction: column;
  gap: 22px;
`;

const Top = styled.div`
  display: flex;
  flex: 1;
   max-width: 100%;
  // width:800px;
  // margin-left:300px;
  background-image: url(${bgImage});
  background-size: cover;
  // background-position: center;
   background-position: center 49%; 
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  flex-direction: column;

`;

const Text = styled.div`
  color: #FFD7550;
  margin-top: 200px;
  font-size: 45px;
  font-family: "Poppins", sans-serif;
  text-align: left;
  margin-left: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  @media (max-width: 1200px) {
    font-size: 30px;
    margin-top: 100px;
  }
`;

const Span = styled.div`
  color: #C0C0C0;
  font-size: 25px;
  font-family: "Poppins", sans-serif;
  text-align: left;
  margin-left: 10px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  @media (max-width: 1200px) {
    font-size: 15px;
  }
`;

const Bottom = styled.div`
  display: flex;
  flex: 1;
`;

const Section = styled.div`
  flex: 1;
  min-width: 280px;
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.text_primary + 20};
  border-radius: 14px;
  box-shadow: 1px 6px 20px 0px ${({ theme }) => theme.primary + 15};
  display: flex;
  flex-direction: row;
  gap: 6px;
  @media (max-width: 600px) {
    padding: 16px;
  }
`;

const Image = styled.div`;
display: flex;
  flex: 0.5;
  width: auto;
  background-image: url(${custmImage});
  background-size: cover;
  background-position: center;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  flex-direction: column;

`;

const Form = styled.form`
  display: flex;
  flex: 0.5;
  flex-direction: column;
  gap: 10px;
`;

const Contact = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  // Handle form submission, e.g., send data to server
  const handleSubmit = async() => {
    setLoading(true);
    setButtonDisabled(true);
    await ContactUs({ name, email, message })
    .then((res)=>{
      setLoading(false);
      setButtonDisabled(false);
      alert(res.data.message);
      // Clear the input fields
      setName("");
      setEmail("");
      setMessage("");
    })
    .catch((err) => {
      alert(err.response.data.message);
      setLoading(false);
      setButtonDisabled(false);
    });
      
  };
  return (
    <Container>
      <Wrapper>
        <Top>
          <Text>Contact Us</Text>
          <Span>We are here to support you along the way!..</Span>
        </Top>
        <Bottom>
          <Section>
            <Form>
              <TextInput
                label="Name"
                placeholder="Enter your name"
                name="name"
                value={name}
                // onChange={handleChange}
                handelChange={(e)=>{setName(e.target.value)}}
              />
              <TextInput
                label="Email"
                placeholder="Enter your email address"
                name="email"
                value={email}
                // onChange={handleChange}
                handelChange={(e)=>{setEmail(e.target.value)}}
              />
              <TextInput
                label="Message"
                textArea
                name="message"
                rows={9}
                value={message}
                // onChange={handleChange}
                handelChange={(e)=>{setMessage(e.target.value)}}
                placeholder="Talk with us! Please drop your message.."
              />
              <Button text="Send"
              onClick={handleSubmit}
              isLoading={loading}
              isDisabled={buttonDisabled}/>
            </Form>
            <Image></Image>

          </Section>
        </Bottom>
      </Wrapper>
    </Container>
  );
};

export default Contact;
