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
        minHeight: 600,
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
          <Typography variant="h4" sx={{ color: "white", fontWeight: "bold", zIndex: 1, textAlign: "center", px: 2 }}>
            Join Us Today
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
            SIGNUP
          </Typography>

          <Box sx={{ width: "100%", maxWidth: 320, display: "flex", flexDirection: "column", gap: 2.5 }}>
            <TextField
              label="Name"
              variant="standard"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
            />
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
            <TextField
              label="Confirm Password"
              variant="standard"
              value={conformpassword}
              onChange={(e) => setConformpassword(e.target.value)}
              type="password"
              fullWidth
            />

            <Button
              variant="contained"
              color="primary"
              onClick={handleSignup}
              sx={{ borderRadius: 5, marginTop: 2, padding: 1.2 }}
            >
              Signup
            </Button>

            <Typography variant="body2" sx={{ textAlign: "center" }}>
              Already have an account? <a href="/">Login</a>
            </Typography>
          </Box>
        </Box>

      </Box>
    </Box>
  )
}

export default Signup