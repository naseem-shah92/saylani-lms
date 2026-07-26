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

const Courses = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName");
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUserId(user.id);

    const { data: coursesData } = await supabase.from('courses').select('*');
    setCourses(coursesData || []);

    const { data: enrollData } = await supabase
      .from('enrollments')
      .select('*')
      .eq('user_id', user.id);
    setEnrollments(enrollData || []);
  };

  const handleEnroll = async (courseId) => {
    const { error } = await supabase.from('enrollments').insert({
      user_id: userId,
      course_id: courseId,
      progress: 0,
    });

    if (error) {
      alert(error.message);
    } else {
      loadData();
    }
  };

  const getEnrollment = (courseId) => {
    return enrollments.find((e) => e.course_id === courseId);
  };

  return (
    <div>
      <Sidebar />
      <Box sx={{ marginLeft: "240px", padding: 2, maxWidth: 900 }}>

        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Avatar>{userName ? userName[0] : "U"}</Avatar>
            <Typography variant="body1">{userName}</Typography>
          </Box>
          <TextField size="small" placeholder="Search Course" sx={{ width: 250 }} />
        </Box>

        {courses.map((course) => {
          const enrollment = getEnrollment(course.id);

          return (
            <Card key={course.id} sx={{ padding: 3, marginBottom: 2 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
                <Typography variant="h6">{course.title}</Typography>
                {enrollment && <Chip label="ENROLLED" color="primary" variant="outlined" />}
              </Box>

              {enrollment ? (
                <>
                  <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: 1 }}>
                    <Typography variant="body2">Progress</Typography>
                    <Typography variant="body2">{enrollment.progress}% Completed</Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={enrollment.progress}
                    sx={{ height: 8, borderRadius: 5, marginBottom: 3 }}
                  />
                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={() => navigate("/dashboard", { state: { courseId: course.id } })}
                  >
                    View Details
                  </Button>
                </>
              ) : (
                <Button
                   variant="contained"
                    fullWidth
                  onClick={() => navigate(`/enroll/${course.id}`)}
                >
                  Enroll Now
              </Button>
              )}
            </Card>
          );
        })}

      </Box>
    </div>
  )
}

export default Courses