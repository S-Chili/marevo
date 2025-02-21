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

const defaultTheme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  const [firstName, setfirstName] = React.useState('');
  const [lastName, setlastName] = React.useState('');
  const [email, setemail] = React.useState('');
  const [password, setpassword] = React.useState('');
  const [showAlert, setShowAlert] = React.useState(false);
  const [userName, setUserName] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  
  const API_URL = process.env.REACT_APP_API_URL;

  const handleSignUp = async () => {
    setLoading(true);
    const userData = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      password: password.trim(),
    };
    
    try {
      // Відправляємо дані на сервер для реєстрації
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      // Перевірка успіху реєстрації
      if (!response.ok) {
        throw new Error("Error during registration");
      }

      const data = await response.json();
      console.log("Response from server:", data);

      // Після реєстрації автоматично виконуємо логін
      const loginResponse = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password: password.trim(),
        }),
        credentials: "include", // Додаємо кукі
      });

      if (!loginResponse.ok) {
        throw new Error("Error during login");
      }

      const loginData = await loginResponse.json();
         setUserName(data.firstName);
   localStorage.setItem('showAlert', 'true');
    setShowAlert(true);

    // Встановлюємо таймер, щоб автоматично закрити алерт через 30 секунд
        setTimeout(() => {
          setShowAlert(false);
          localStorage.removeItem('showAlert');
          navigate('/'); // Перенаправлення після того, як алерт закриється
          window.location.reload();
        }, 2000); // 2 секунд

      console.log("Login success:", loginData);

      // Після успішного логіну, очистити поля форми
      setfirstName('');
      setlastName('');
      setemail('');
      setpassword('');
    } catch (error) {
      console.error("Failed:", error.message);
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
                  {`Welcome, ${userName}! You have successfully logged in.`}
                </Alert>
              </Stack>
            )}
          </Box>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              {loading ? (
                <Stack spacing={1}>
                  <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                  <Skeleton variant="text" sx={{ fontSize: '1rem' }} />                  <Skeleton variant="rectangular" width={210} height={40} />
                  <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
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
                    onChange={(e) => setfirstName(e.target.value)}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setlastName(e.target.value)}
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
                    onChange={(e) => setemail(e.target.value)}
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
                    onChange={(e) => setpassword(e.target.value)}
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
              onClick={handleSignUp}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
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
