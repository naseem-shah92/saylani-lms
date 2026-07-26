import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { supabase } from '../supabaseClient';

const Progress = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const { data: { user } } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from('enrollments')
      .select('progress, courses(id, title, batch, roll)')
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
      <Box sx={{ marginLeft: "240px", padding: 2, maxWidth: 900 }}>
        <Typography variant="h4" sx={{ marginBottom: 3 }}>Progress</Typography>

        {enrolledCourses.length === 0 ? (
          <Typography>You haven't enrolled in any course yet.</Typography>
        ) : (
          enrolledCourses.map((item) => (
            <Card key={item.courses.id} sx={{ marginBottom: 2, padding: 2, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                {item.progress === 100 ? (
                  <CheckCircleIcon sx={{ color: "green" }} />
                ) : (
                  <AccessTimeIcon sx={{ color: "orange" }} />
                )}
                <Box>
                  <Typography variant="h6">{item.courses.title}</Typography>
                  <Typography variant="body2">Batch: {item.courses.batch} | Roll: {item.courses.roll}</Typography>
                </Box>
              </Box>

              <Box sx={{ position: "relative", display: "inline-flex" }}>
                <CircularProgress variant="determinate" value={item.progress} size={50} />
                <Box sx={{ top: 0, left: 0, bottom: 0, right: 0, position: "absolute", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Typography variant="caption">{item.progress}%</Typography>
                </Box>
              </Box>
            </Card>
          ))
        )}
      </Box>
    </div>
  )
}

export default Progress