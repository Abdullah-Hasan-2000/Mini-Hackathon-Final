import React, { useState, useEffect } from 'react'
import { Box, Paper } from '@mui/material';
import Typography from '@mui/material/Typography';
import InputField from '../../components/InputFields/InputField';
import SubmitButton from '../../components/Buttons/SubmitButton';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser } from '../../store/Slices/LoginSlice';
import { toast, Bounce } from 'react-toastify';
import { resetAuthState } from '../../store/Slices/LoginSlice';
import Loader from '../../components/Loader/Loader';

const SignUpScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, isError, isSuccess, userType } = useSelector((state) => state.Login);

    const handleSignUp = () => {
        console.log("Sign Up attempted with email:", email, "and password", password)
        dispatch(signupUser({ email, password }));
    }

    useEffect(() => {
        if (isSuccess) {
            navigate("/login");
            toast.success('Sign Up Successful, Please Login!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        } else if (isError) {
            toast.error('Sign Up Failed! Please try again.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }
    }, [isSuccess, userType, navigate, isError]);

    useEffect(() => {
        return () => {
            dispatch(resetAuthState());
        };
    }, [dispatch]);

    if (isLoading) {
        return <Loader />;
    };

    return (
        <>
            <Box sx={{ paddingTop: "150px" }} >
                <Paper elevation={4} sx={{ padding: "20px", textAlign: "center", width: "500px", margin: "auto" }}>
                    <Typography variant="h4" sx={{ marginTop: "10px" }}>
                        SignUp Screen
                    </Typography>
                    <Typography variant="body2" sx={{ marginY: "15px" }}>
                        Welcome to the Learning Management System...
                        <br />Please SignUp to continue.
                    </Typography>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        handleSignUp();
                    }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginBottom: "20px" }}>
                            <InputField onchange={(e) => setEmail(e.target.value)} label="Email" autoComplete="email" type="email" />
                            <InputField onchange={(e) => setPassword(e.target.value)} label="Password" type="password" autoComplete="new-password" />
                        </div>
                        <SubmitButton color="primary" value="Sign Up" type="submit" />
                    </form>
                    <Typography variant="body2" sx={{ marginTop: "20px" }}>
                        Already have an account? <Link to="/login">Login</Link>
                    </Typography>
                </Paper>
            </Box>
        </>
    )
}

export default SignUpScreen