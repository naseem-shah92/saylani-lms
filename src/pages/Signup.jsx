import React from 'react'
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { supabase } from '../supabaseClient';

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conformpassword, setConformpassword] = useState("");
  const navigate = useNavigate();

  
const handleSignup = async () => {
  if (name === "" || email === "" || password === "" || conformpassword === "") {
    alert("Please fill all fields");
    return;
  }

  if (password !== conformpassword) {
    alert("Passwords do not match");
    return;
  }

  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        full_name: name
      }
    }
  });

  if (error) {
    alert(error.message);
  } else {
    alert("Signup successful! Please check your email to verify your account before logging in.");
    navigate("/dashboard");
  }
};

  return (
    <div>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type='password'
        />
        <TextField
          label="Conform password"
          value={conformpassword}
          onChange={(e) => setConformpassword(e.target.value)}
          type='password'
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleSignup}
        >
          Signup
        </Button>
      </Box>
    </div>
  )
}

export default Signup