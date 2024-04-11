import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4a460; /* Lighter shade of brown */
`;

const FormContainer = styled.form`
  background-color: #d2691e; /* Darker shade of brown */
  padding: 40px; /* Increased padding */
  border-radius: 10px;
  width: 400px; /* Increased width */
  
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  color: white;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #cd853f;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Handle registration logic here
    if(password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    
    try {
      const response = await fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName,
          lastName,
          phoneNumber,
          email,
          address,
          password,
          confirmPassword
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }
      
      const data = await response.json();
      console.log(data);
      // Redirect to home page after successful registration
      window.location.href = 'http://localhost:3000/';
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <Container>
      <FormContainer onSubmit={handleSubmit}>
        <h2 style={{ textAlign: 'center', color: 'white' }}>Register</h2>
        <FormGroup>
          <Label>First Name</Label>
          <Input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
        </FormGroup>
        <FormGroup>
          <Label>Last Name</Label>
          <Input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
        </FormGroup>
        <FormGroup>
          <Label>Phone Number</Label>
          <Input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
        </FormGroup>
        <FormGroup>
          <Label>Email</Label>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </FormGroup>
        <FormGroup>
          <Label>Address</Label>
          <Input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
        </FormGroup>
        <FormGroup>
          <Label>Password</Label>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </FormGroup>
        <FormGroup>
          <Label>Confirm Password</Label>
          <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        </FormGroup>
        <Button type="submit">Register</Button>
      </FormContainer>
    </Container>
  );
}

export default Register;
