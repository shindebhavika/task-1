import React, { useEffect, useState } from 'react';
import { Container, TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const Navigate=useNavigate();

  useEffect(()=>{
    const userData=localStorage.getItem('userData')
    if(userData){
      Navigate("/posts")
    }
  },[])
  const handleSubmit = (event: React.FormEvent) => {
   
    event.preventDefault();
    // Handle login logic here
const userData=[name,phone,email]

if(localStorage.getItem('userData')){
  Navigate("/")


}else{
  
  localStorage.setItem('userData',JSON.stringify(userData))
  Navigate("/posts")
}
    
  };

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <TextField
            label="Name"
            type="text"
            variant="outlined"
            margin="normal"
            fullWidth
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Phone number"
            type="tel"
            variant="outlined"
            margin="normal"
            fullWidth
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            margin="normal"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: '16px' }}
          >
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default LoginForm;
