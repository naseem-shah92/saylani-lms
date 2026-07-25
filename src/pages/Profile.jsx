import Sidebar from '../components/Sidebar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

const Profile = () => {
  const userName = localStorage.getItem("userName");
  const userEmail = localStorage.getItem("userEmail");

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

          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, marginBottom: 3 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body2" color="text.secondary">Batch</Typography>
              <Typography variant="body2">1</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body2" color="text.secondary">Roll No</Typography>
              <Typography variant="body2">858992</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body2" color="text.secondary">Campus</Typography>
              <Typography variant="body2">Online</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body2" color="text.secondary">City</Typography>
              <Typography variant="body2">All Pakistan</Typography>
            </Box>
          </Box>

          <Button variant="contained" fullWidth>Edit Profile</Button>
        </Card>
      </Box>
    </div>
  )
}

export default Profile