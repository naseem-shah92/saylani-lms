import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Sidebar from '../components/Sidebar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import LinearProgress from '@mui/material/LinearProgress';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import { supabase } from '../supabaseClient';
import { useLocation } from "react-router-dom";

const Courses = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName");
  const [courses, setCourses] = useState([]); 
const location = useLocation();
const selectedCourseId = location.state?.courseId;

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    const { data, error } = await supabase.from('courses').select('*');

    if (error) {
      console.log(error);
    } else {
      setCourses(data);
    }
  };

  return (
    <div>
      <Sidebar />
      <Box sx={{ marginLeft: "240px", padding: 2, maxWidth: 900 }}>

        {/* Top Bar */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Avatar>{userName ? userName[0] : "U"}</Avatar>
            <Typography variant="body1">{userName}</Typography>
          </Box>
          <TextField size="small" placeholder="Search Course" sx={{ width: 250 }} />
        </Box>

        {/* Course Cards */}
        {courses.map((course) => (
          <Card key={course.id} sx={{ padding: 3, marginBottom: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
              <Typography variant="h6">{course.title}</Typography>
              <Chip label="ENROLLED" color="primary" variant="outlined" />
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: 1 }}>
              <Typography variant="body2">Progress</Typography>
              <Typography variant="body2">{course.progress}% Completed</Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={course.progress}
              sx={{ height: 8, borderRadius: 5, marginBottom: 3 }}
            />

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 2 }}>
              <Typography variant="body2">Batch: {course.batch}</Typography>
              <Typography variant="body2">Roll: {course.roll}</Typography>
              <Typography variant="body2">Campus: {course.campus}</Typography>
              <Typography variant="body2">City: {course.city}</Typography>
            </Box>

            <Button
              variant="outlined"
              fullWidth
              onClick={() => navigate("/dashboard", { state: { courseId: course.id } })}
            >
              View Details
            </Button>
          </Card>
        ))}

      </Box>
    </div>
  )
}

export default Courses