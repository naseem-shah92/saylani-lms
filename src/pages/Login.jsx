import React from 'react'
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { supabase } from '../supabaseClient';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (email === "" || password === "") {
      alert("Please fill all fields");
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      alert(error.message);
    } else {
      const userName = data.user.user_metadata.full_name;
      localStorage.setItem("userName", userName);
      localStorage.setItem("userEmail", email);
      localStorage.setItem("isLoggedIn", "true");
      navigate("/dashboard");
    }
  };

  return (
    <div>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
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

        <Button
          variant="contained"
          color="primary"
          onClick={handleLogin}
        >
          Login
        </Button>
      </Box>
    </div>
  )
}

export default Login