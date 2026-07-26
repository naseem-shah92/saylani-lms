import React from 'react'
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';
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
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
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
    <Box sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      bgcolor: "primary.dark",
      padding: 2,
    }}>
      <Box sx={{
        display: "flex",
        width: { xs: "100%", md: 850 },
        height: 550,
        borderRadius: 4,
        overflow: "hidden",
        boxShadow: "0px 0px 40px rgba(255,255,255,0.4)",
      }}>

        {/* Left side — geometric shapes */}
        <Box sx={{
          display: { xs: "none", md: "flex" },
          width: "40%",
          bgcolor: "primary.main",
          position: "relative",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}>
          <Box sx={{
            position: "absolute",
            width: 300,
            height: 300,
            bgcolor: "primary.light",
            opacity: 0.3,
            transform: "rotate(45deg)",
            top: -50,
            left: -100,
          }} />
          <Box sx={{
            position: "absolute",
            width: 200,
            height: 200,
            bgcolor: "primary.light",
            opacity: 0.4,
            transform: "rotate(45deg)",
            bottom: -50,
            right: -60,
          }} />
          <Typography variant="h4" sx={{ color: "white", fontWeight: "bold", zIndex: 1 }}>
            Welcome Back
          </Typography>
        </Box>

        {/* Right side — form */}
        <Box sx={{
          width: { xs: "100%", md: "60%" },
          bgcolor: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 5,
        }}>
          <Avatar sx={{ bgcolor: "primary.main", width: 60, height: 60, marginBottom: 2 }}>
            <PersonIcon fontSize="large" />
          </Avatar>
          <Typography variant="h5" sx={{ marginBottom: 4, fontWeight: "bold" }}>
            LOGIN
          </Typography>

          <Box sx={{ width: "100%", maxWidth: 320, display: "flex", flexDirection: "column", gap: 3 }}>
            <TextField
              label="Email"
              variant="standard"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
            />
            <TextField
              label="Password"
              variant="standard"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              fullWidth
            />

            <Button
              variant="contained"
              color="primary"
              onClick={handleLogin}
              sx={{ borderRadius: 5, marginTop: 2, padding: 1.2 }}
            >
              Login
            </Button>

            <Typography variant="body2" sx={{ textAlign: "center" }}>
              Don't have an account? <a href="/signup">Signup</a>
            </Typography>
          </Box>
        </Box>

      </Box>
    </Box>
  )
}

export default Login