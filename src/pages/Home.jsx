import React from 'react'
import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SchoolIcon from '@mui/icons-material/School';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import VerifiedIcon from '@mui/icons-material/Verified';
import HtmlIcon from '@mui/icons-material/Html';
import JavascriptIcon from '@mui/icons-material/Javascript';
import HubIcon from '@mui/icons-material/Hub';
import LayersIcon from '@mui/icons-material/Layers';

// Course title ke hisaab se icon choose karne wala helper function
const getCourseIcon = (title) => {
  if (title.includes("HTML")) return <HtmlIcon sx={{ fontSize: 50, color: "white" }} />;
  if (title.includes("JavaScript")) return <JavascriptIcon sx={{ fontSize: 50, color: "white" }} />;
  if (title.includes("React")) return <HubIcon sx={{ fontSize: 50, color: "white" }} />;
  return <LayersIcon sx={{ fontSize: 50, color: "white" }} />;
};

const Home = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

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

  const handleEnrollClick = (courseId) => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn) {
      navigate(`/enroll/${courseId}`);
    } else {
      navigate("/signup");
    }
  };

  return (
    <Box>
      {/* Navbar */}
      <Box sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 40px",
        borderBottom: "1px solid #e0e0e0",
      }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <SchoolIcon sx={{ color: "primary.main", fontSize: 32 }} />
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Saylani LMS
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Button onClick={() => navigate("/login")}>Login</Button>
          <Button variant="contained" onClick={() => navigate("/signup")}>
            Join for Free
          </Button>
        </Box>
      </Box>

      {/* Hero Section */}
      <Box sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        justifyContent: "space-between",
        padding: { xs: 4, md: 8 },
        gap: 4,
      }}>
        <Box sx={{ maxWidth: 500 }}>
          <Typography variant="h3" sx={{ fontWeight: "bold", marginBottom: 2 }}>
            Learn Without Limits
          </Typography>
          <Typography variant="h6" sx={{ color: "text.secondary", marginBottom: 1 }}>
            Master Web Development, Step by Step
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary", marginBottom: 3 }}>
            Join thousands of students building real-world skills through hands-on courses and projects.
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{ borderRadius: 5, padding: "10px 30px" }}
            onClick={() => navigate("/signup")}
          >
            Get Started
          </Button>
        </Box>

        <Box sx={{
          width: { xs: "100%", md: 400 },
          height: 300,
          bgcolor: "primary.main",
          borderRadius: 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <SchoolIcon sx={{ fontSize: 120, color: "white", opacity: 0.5 }} />
        </Box>
      </Box>

      {/* Popular Courses Section */}
      <Box sx={{ padding: { xs: 4, md: 8 }, bgcolor: "#f4f6f8" }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: 1, textAlign: "center" }}>
          Popular Courses
        </Typography>
        <Typography variant="body1" sx={{ color: "text.secondary", textAlign: "center", marginBottom: 6 }}>
          Start learning with our most loved courses
        </Typography>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 4, justifyContent: "center", alignItems: "stretch" }}>
          {courses.map((course) => (
            <Box key={course.id} sx={{
              width: 250,
              bgcolor: "white",
              borderRadius: 3,
              overflow: "hidden",
              boxShadow: "0px 2px 10px rgba(0,0,0,0.08)",
              display: "flex",
              flexDirection: "column",
            }}>
              <Box sx={{
                height: 120,
                bgcolor: "primary.light",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                {getCourseIcon(course.title)}
              </Box>
              <Box sx={{ padding: 2.5, flexGrow: 1, display: "flex", flexDirection: "column" }}>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold", fontSize: "1.1rem", marginBottom: 0.5 }}>
                  {course.title}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary", marginBottom: 2 }}>
                  {course.progress === 100 ? "Advanced" : "Beginner"}
                </Typography>
                <Button
                  variant="contained"
                  size="small"
                  sx={{ marginTop: "auto" }}
                  onClick={() => handleEnrollClick(course.id)}
                >
                  Enroll Now
                </Button>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Features Section */}
      <Box sx={{ padding: { xs: 4, md: 8 }, bgcolor: "white" }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: 1, textAlign: "center" }}>
          Why Choose Us
        </Typography>
        <Typography variant="body1" sx={{ color: "text.secondary", textAlign: "center", marginBottom: 6 }}>
          Everything you need to succeed in your learning journey
        </Typography>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, justifyContent: "center", alignItems: "stretch" }}>
          {[
            { icon: <ImportContactsIcon sx={{ fontSize: 40, color: "primary.main" }} />, title: "Hands-On Courses", desc: "Learn by building real projects, not just watching videos." },
            { icon: <TrendingUpIcon sx={{ fontSize: 40, color: "primary.main" }} />, title: "Track Your Progress", desc: "Stay motivated with visual progress tracking for every course." },
            { icon: <VerifiedIcon sx={{ fontSize: 40, color: "primary.main" }} />, title: "Certified Learning", desc: "Complete courses and showcase your verified skills." },
          ].map((item, index) => (
            <Box key={index} sx={{
              width: 280,
              padding: 3,
              borderRadius: 3,
              border: "1px solid #e0e0e0",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}>
              {item.icon}
              <Typography variant="h6" sx={{ marginTop: 2, marginBottom: 1, fontWeight: "bold" }}>
                {item.title}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {item.desc}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Stats Section */}
      <Box sx={{
        bgcolor: "primary.main",
        padding: { xs: 4, md: 6 },
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: { xs: 4, md: 8 },
        textAlign: "center",
      }}>
        {[
          { number: `${courses.length}+`, label: "Courses" },
          { number: "100+", label: "Students" },
          { number: "24/7", label: "Access" },
          { number: "100%", label: "Hands-On" },
        ].map((stat, index) => (
          <Box key={index}>
            <Typography variant="h3" sx={{ color: "white", fontWeight: "bold" }}>
              {stat.number}
            </Typography>
            <Typography variant="body1" sx={{ color: "white", opacity: 0.9 }}>
              {stat.label}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* How It Works Section */}
      <Box sx={{ padding: { xs: 4, md: 8 }, bgcolor: "white" }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: 1, textAlign: "center" }}>
          How It Works
        </Typography>
        <Typography variant="body1" sx={{ color: "text.secondary", textAlign: "center", marginBottom: 6 }}>
          Start your learning journey in 3 simple steps
        </Typography>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 4, justifyContent: "center" }}>
          {[
            { step: "1", title: "Create Account", desc: "Sign up for free in less than a minute." },
            { step: "2", title: "Pick a Course", desc: "Choose from our hands-on web development courses." },
            { step: "3", title: "Start Learning", desc: "Track your progress and build real projects." },
          ].map((item, index) => (
            <Box key={index} sx={{ width: 260, textAlign: "center" }}>
              <Box sx={{
                width: 60,
                height: 60,
                borderRadius: "50%",
                bgcolor: "primary.main",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 24,
                fontWeight: "bold",
                margin: "0 auto 16px",
              }}>
                {item.step}
              </Box>
              <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 1 }}>
                {item.title}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {item.desc}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Testimonials Section */}
      <Box sx={{ padding: { xs: 4, md: 8 }, bgcolor: "#f4f6f8" }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: 5, textAlign: "center" }}>
          What Our Students Say
        </Typography>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, justifyContent: "center" }}>
          {[
            { name: "Ahmed R.", text: "This platform helped me build real projects, not just watch tutorials.", initial: "A" },
            { name: "Sara K.", text: "Progress tracking kept me motivated to finish every course.", initial: "S" },
            { name: "Bilal M.", text: "Best place to learn web development step by step.", initial: "B" },
          ].map((item, index) => (
            <Box key={index} sx={{
              width: 320,
              bgcolor: "white",
              padding: 3,
              borderRadius: 3,
              boxShadow: "0px 2px 10px rgba(0,0,0,0.06)",
            }}>
              <Typography variant="body2" sx={{ color: "text.secondary", marginBottom: 2, fontStyle: "italic" }}>
                "{item.text}"
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <Box sx={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  bgcolor: "primary.main",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                }}>
                  {item.initial}
                </Box>
                <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                  {item.name}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      {/* CTA Banner */}
      <Box sx={{
        bgcolor: "#1a1a2e",
        padding: { xs: 5, md: 8 },
        textAlign: "center",
      }}>
        <Typography variant="h4" sx={{ color: "white", fontWeight: "bold", marginBottom: 2 }}>
          Ready to Start Learning?
        </Typography>
        <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.7)", marginBottom: 4 }}>
          Join our community of learners today — it's free to get started.
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{ borderRadius: 5, padding: "10px 30px" }}
          onClick={() => navigate("/signup")}
        >
          Join for Free
        </Button>
      </Box>

      {/* Footer */}
      <Box sx={{
        bgcolor: "#1e1e2b",
        padding: 4,
        textAlign: "center",
      }}>
        <Typography variant="body2" sx={{ color: "white", opacity: 0.7 }}>
          © 2026 Saylani LMS. Built with React & Material UI.
        </Typography>
      </Box>

    </Box>
  )
}

export default Home