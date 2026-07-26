import { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import Sidebar from '../components/Sidebar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import Chip from '@mui/material/Chip';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { supabase } from '../supabaseClient';

const Dashboard = () => {
  const userName = localStorage.getItem("userName");
  const location = useLocation();
  const selectedCourseId = location.state?.courseId;
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const { data: { user } } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from('enrollments')
      .select('progress, batch, roll, campus, city, courses(id, title)')
      .eq('user_id', user.id);

    if (error) {
      console.log(error);
    } else {
      setEnrolledCourses(data);
    }
  };

  const totalCourses = enrolledCourses.length;
  const completedCourses = enrolledCourses.filter((c) => c.progress === 100).length;
  const pendingCourses = enrolledCourses.filter((c) => c.progress < 100).length;

  const stats = [
    { label: "Total Courses", value: totalCourses, icon: <ImportContactsIcon sx={{ color: "#1976d2" }} /> },
    { label: "Completed Courses", value: completedCourses, icon: <CheckCircleIcon sx={{ color: "green" }} /> },
    { label: "Pending Courses", value: pendingCourses, icon: <AccessTimeIcon sx={{ color: "orange" }} /> },
  ];

  const activeCourse =
    enrolledCourses.find((c) => c.courses.id === selectedCourseId) ||
    enrolledCourses.find((c) => c.progress < 100) ||
    enrolledCourses[0];

  return (
    <div>
      <Sidebar />
      <Box sx={{ marginLeft: "240px", padding: 3 }}>
        <Typography variant="h4" sx={{ marginBottom: 3 }}>
          Welcome, {userName}
        </Typography>

        <Box sx={{ display: "flex", gap: 2, marginBottom: 3, flexWrap: "wrap" }}>
          {stats.map((stat, index) => (
            <Card key={index} sx={{ flex: 1, minWidth: 200, padding: 2 }}>
              <CardContent sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Box>
                  <Typography variant="h5">{stat.value}</Typography>
                  <Typography variant="body2" color="text.secondary">{stat.label}</Typography>
                </Box>
                {stat.icon}
              </CardContent>
            </Card>
          ))}
        </Box>

        {activeCourse ? (
          <>
            <Typography variant="h6" sx={{ marginBottom: 1 }}>Active Course</Typography>
            <Card sx={{ padding: 3 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
                <Typography variant="h6">{activeCourse.courses.title}</Typography>
                <Chip label="ENROLLED" color="primary" variant="outlined" />
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: 1 }}>
                <Typography variant="body2">Progress</Typography>
                <Typography variant="body2">{activeCourse.progress}% Completed</Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={activeCourse.progress}
                sx={{ height: 8, borderRadius: 5, marginBottom: 3 }}
              />

              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                <Typography variant="body2">Batch: {activeCourse.batch}</Typography>
                <Typography variant="body2">Roll: {activeCourse.roll}</Typography>
                <Typography variant="body2">Campus: {activeCourse.campus}</Typography>
                <Typography variant="body2">City: {activeCourse.city}</Typography>
              </Box>
            </Card>
          </>
        ) : (
          <Typography>You haven't enrolled in any course yet. Visit the Courses page to get started!</Typography>
        )}
      </Box>
    </div>
  )
}

export default Dashboard