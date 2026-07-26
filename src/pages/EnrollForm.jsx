import { useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from '../components/Sidebar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { supabase } from '../supabaseClient';

const EnrollForm = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [batch, setBatch] = useState("");
  const [roll, setRoll] = useState("");
  const [campus, setCampus] = useState("");
  const [city, setCity] = useState("");

  const handleSubmit = async () => {
    if (batch === "" || roll === "" || campus === "" || city === "") {
      alert("Please fill all fields");
      return;
    }

    const { data: { user } } = await supabase.auth.getUser();

    const { error } = await supabase.from('enrollments').insert({
      user_id: user.id,
      course_id: courseId,
      progress: 0,
      batch: batch,
      roll: roll,
      campus: campus,
      city: city,
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Enrollment successful!");
      navigate("/dashboard");
    }
  };

  return (
    <div>
      <Sidebar />
      <Box sx={{ marginLeft: "240px", padding: 3, display: "flex", justifyContent: "center" }}>
        <Card sx={{ padding: 4, maxWidth: 450, width: "100%" }}>
          <Typography variant="h5" sx={{ marginBottom: 3, textAlign: "center" }}>
            Complete Your Enrollment
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField label="Batch" value={batch} onChange={(e) => setBatch(e.target.value)} />
            <TextField label="Roll No" value={roll} onChange={(e) => setRoll(e.target.value)} />
            <TextField label="Campus" value={campus} onChange={(e) => setCampus(e.target.value)} />
            <TextField label="City" value={city} onChange={(e) => setCity(e.target.value)} />

            <Button variant="contained" onClick={handleSubmit}>
              Confirm Enrollment
            </Button>
          </Box>
        </Card>
      </Box>
    </div>
  )
}

export default EnrollForm