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

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Handle login logic here
    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }
      
      const data = await response.json();
      console.log(data);
      
      // Show alert for login success
      alert('Login successful!');
      
      // Store userId in local storage
      localStorage.setItem('userId', data.user.userId);
      
      // Redirect to homepage after 2 seconds
      setTimeout(() => {
        window.location.href = 'http://localhost:3000/';
      }, 2000);
    } catch (error) {
      console.error('Error:', error.message);
      // Show login error message
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <Container>
      <FormContainer onSubmit={handleSubmit}>
        <h2 style={{ textAlign: 'center', color: 'white' }}>Login</h2>
        <FormGroup>
          <Label>Email</Label>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </FormGroup>
        <FormGroup>
          <Label>Password</Label>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </FormGroup>
        <Button type="submit">Login</Button>
      </FormContainer>
    </Container>
  );
}

export default Login;
