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

  // Real data se calculate karo
  const totalCourses = courses.length;
  const completedCourses = courses.filter((c) => c.progress === 100).length;
  const pendingCourses = courses.filter((c) => c.progress < 100).length;

  const stats = [
    { label: "Total Courses", value: totalCourses, icon: <ImportContactsIcon sx={{ color: "#1976d2" }} /> },
    { label: "Completed Courses", value: completedCourses, icon: <CheckCircleIcon sx={{ color: "green" }} /> },
    { label: "Pending Courses", value: pendingCourses, icon: <AccessTimeIcon sx={{ color: "orange" }} /> },
  ];

  // Active course — sabse pehla course jo abhi complete nahi hua
  const activeCourse = 
  courses.find((c) => c.id === selectedCourseId) || 
  courses.find((c) => c.progress < 100) || 
  courses[0];
  return (
    <div>
      <Sidebar />
      <Box sx={{ marginLeft: "240px", padding: 3 }}>
        <Typography variant="h4" sx={{ marginBottom: 3 }}>
          Welcome {userName}
        </Typography>

        {/* Stat Cards Row */}
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

        {/* Active Course Card */}
        {activeCourse && (
          <>
            <Typography variant="h6" sx={{ marginBottom: 1 }}>Active Course</Typography>
            <Card sx={{ padding: 3 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
                <Typography variant="h6">{activeCourse.title}</Typography>
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
        )}
      </Box>
    </div>
  )
}

export default Dashboard