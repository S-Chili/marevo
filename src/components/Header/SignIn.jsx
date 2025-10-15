import React from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom'; 
import { useAuth } from './AuthForm'; 

const defaultTheme = createTheme();

export default function SignIn() {

  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showAlert, setShowAlert] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [alertName, setAlertName] = React.useState('');
    
  const API_URL = process.env.REACT_APP_API_URL;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const userData = {
      email: email.trim(),
      password: password.trim(),
    };

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
        credentials: 'include',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Error submitting the form');
      }

      const data = await response.json();
      console.log('Response from server:', data);

      setAlertName(data.user.firstName);
      
      login(data.user); 
      
      setShowAlert(true);
      
      setTimeout(() => {
        setShowAlert(false);
        navigate('/');
      }, 2000);

      setEmail('');
      setPassword('');

    } catch (error) {
      console.error('Failed to submit the form:', error.message);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs" sx={{ marginTop: '128px' }}>
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
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box sx={{ position: 'fixed', top: 20, right: 20, width: 'auto', zIndex: 999 }}>
            {showAlert && (
              <Stack sx={{ width: '100%' }} spacing={2}>
                <Alert severity="success">
                  {`Welcome, ${alertName}! You have successfully logged in.`}
                </Alert>
              </Stack>
            )}
          </Box>
          {loading ? (
            <Stack spacing={1}>
              <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
              <Skeleton variant="text" sx={{ fontSize: '1rem' }} />                  
              <Skeleton variant="rectangular" width={210} height={40} />
            </Stack>
          ) : (
            <div style={{ display: 'flex', justifySelf: 'center', flexDirection: 'column', gap: '10px' }}>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  {loading ? 'Sending...' : 'Sign In'}
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link to="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link to="/signup" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </div>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
}