import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import { supabase } from '../supabaseClient';

const Profile = () => {
  const userName = localStorage.getItem("userName");
  const userEmail = localStorage.getItem("userEmail");
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const { data: { user } } = await supabase.auth.getUser();

  const { data, error } = await supabase
  .from('enrollments')
  .select('progress, batch, roll, campus, city, courses(title)')
  .eq('user_id', user.id);

    if (error) {
      console.log(error);
    } else {
      setEnrolledCourses(data);
    }
  };

  return (
    <div>
      <Sidebar />
      <Box sx={{ marginLeft: "240px", padding: 3, maxWidth: 900 }}>
        <Typography variant="h4" sx={{ marginBottom: 3 }}>
          Profile
        </Typography>

        <Card sx={{ padding: 4, maxWidth: 500 }}>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 3 }}>
            <Avatar sx={{ width: 80, height: 80, fontSize: 32, marginBottom: 2, bgcolor: "primary.main" }}>
              {userName ? userName[0].toUpperCase() : "U"}
            </Avatar>
            <Typography variant="h6">{userName}</Typography>
            <Typography variant="body2" color="text.secondary">{userEmail}</Typography>
          </Box>

          <Divider sx={{ marginBottom: 2 }} />

          <Typography variant="subtitle2" sx={{ marginBottom: 1.5 }}>
            Enrolled Courses
          </Typography>

        {enrolledCourses.length === 0 ? (
  <Typography variant="body2" color="text.secondary">
    You haven't enrolled in any course yet.
  </Typography>
) : (
  <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
    {enrolledCourses.map((item, index) => (
      <Box key={index} sx={{ padding: 2, border: "1px solid #eee", borderRadius: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 1 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>{item.courses.title}</Typography>
          <Chip label={`${item.progress}%`} size="small" />
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          <Typography variant="caption" color="text.secondary">Batch: {item.batch}</Typography>
          <Typography variant="caption" color="text.secondary">Roll: {item.roll}</Typography>
          <Typography variant="caption" color="text.secondary">Campus: {item.campus}</Typography>
          <Typography variant="caption" color="text.secondary">City: {item.city}</Typography>
        </Box>
      </Box>
    ))}
  </Box>
)}
        </Card>
      </Box>
    </div>
  )
}

export default Profile