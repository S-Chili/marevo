import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom'; 
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';
import { useAuth } from "./AuthForm";

const defaultTheme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showAlert, setShowAlert] = React.useState(false);
  const [alertName, setAlertName] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  
  const API_URL = process.env.REACT_APP_API_URL;

  const handleSignUp = async (e) => {
    e.preventDefault(); 
    setLoading(true);

    const userData = { firstName, lastName, email, password };

    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
         const errorMessage = data.message || "Error during registration";
         throw new Error(errorMessage);
      }

      login(data.user); 
      
      setAlertName(data.user.firstName);

      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        navigate("/");
      }, 2000);

      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      
    } catch (error) {
      console.error("Failed:", error.message);
      alert(`Registration failed: ${error.message}`); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs" sx={{
            marginTop: '128px',
          }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{marginBottom: '20px'}}>
            Sign up
          </Typography>
           <Box sx={{ position: 'fixed', top: 20, right: 20, zIndex: 999 }}>
            {showAlert && (
              <Stack sx={{ width: '100%' }} spacing={2}>
                <Alert severity="success">
                  {`Welcome, ${alertName}! You have successfully logged in.`}
                </Alert>
              </Stack>
            )}
          </Box>
          <Box component="form" noValidate onSubmit={handleSignUp} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              {loading ? (
                // ... Skeleton loading ...
                <Stack spacing={1} sx={{ width: 395 }}>
                  <Skeleton variant="rectangular" width="100%" height={56} />
                  <Skeleton variant="rectangular" width="100%" height={56} />
                  <Skeleton variant="rectangular" width="100%" height={56} />
                  <Skeleton variant="rectangular" width="100%" height={56} />
                  <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                </Stack>
              ) : (
              <div style={{ display: 'flex', justifySelf: 'center', flexDirection: 'column', gap: '10px' }}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    value={firstName}
                    label="First Name"
                    onChange={(e) => setFirstName(e.target.value)} 
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)} 
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} 
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                    label="I want to receive inspiration, marketing promotions and updates via email."
                  />
                </Grid>
              </div>
            )}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading} 
            >
              {loading ? 'Sending...' : 'Sign Up'}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/signin" variant="body2">
                  {"Already have an account? Sign in"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
