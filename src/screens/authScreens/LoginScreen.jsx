import React, { useState, useEffect } from 'react'
import { Box, Paper } from '@mui/material';
import Typography from '@mui/material/Typography';
import InputField from '../../components/InputFields/InputField';
import SubmitButton from '../../components/Buttons/SubmitButton';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../store/Slices/LoginSlice';

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {isLoading, isError, isSuccess, userType} = useSelector((state) => state.Login);

  const handleLogin = () => {
      console.log("Login attempted with email:", email, "and password", password)
      dispatch(loginUser({ email, password }))
  };

  useEffect(() => {
    if (isSuccess && userType === "admin") {
      navigate("/admin-dashboard");
    } else if (isSuccess && userType === "user") {
      navigate("/user-dashboard");
    } else if (isSuccess && userType === "manager") {
      navigate("/manager-dashboard");
    }
  }, [isSuccess, userType, navigate]);

  return (
    <>
      <Box sx={{ paddingTop: "150px" }} >
        <Paper elevation={4} sx={{ padding: "20px", textAlign: "center", width: "500px", margin: "auto" }}>
          <Typography variant="h4" sx={{ marginTop: "10px" }}>
            Login Screen
          </Typography>
          <Typography variant="body2" sx={{ marginY: "15px" }}>
            Welcome to the Learning Management System...
            <br />Please Login to continue.
          </Typography>
          <form onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginBottom: "20px" }}>
              <InputField onchange={(e) => setEmail(e.target.value)} label="Email" autoComplete="email" type="email" />
              <InputField onchange={(e) => setPassword(e.target.value)} label="Password" type="password" autoComplete="new-password" />
            </div>
            <SubmitButton color="primary" value="Login" type="submit" />
          </form>
          <Typography variant="body2" sx={{ marginTop: "20px" }}>
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </Typography>
        </Paper>
      </Box> 
    </>
  )
}

export default LoginScreen