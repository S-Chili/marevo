import React from 'react';
import { useNavigate } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import HeadsetMicOutlinedIcon from '@mui/icons-material/HeadsetMicOutlined';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Avatar from '@mui/material/Avatar';
import { Box, Menu, MenuItem, Tab, Tabs, TextField } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import logo from '../../logo192.png'
import modal from './pop up_desktop/Frame 48.jpg'
import contact from './contact.jpg'
import useAuth from '../Header/useAuth';

function Header({ value, handleChange }) {
  const navigate = useNavigate();
  const isAuthenticated = useAuth();

  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
    setName(''); 
    setPhone('');
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const [openNew, setOpenNew] = React.useState(false);
  const handleCloseNew = () => {
      setOpenNew(false);
      setOpen(false);
  };

  const avatarUrl = localStorage.getItem("avatarUrl");
 
  const handleOpenNew = async () => {
    setLoading(true);
      // Створюємо об'єкт з ім'ям і email
    const contactData = {
      name: name.trim(),
      phone: phone.trim(),
    };

      try {
        
        // Відправляємо дані на сервер
        const response = await fetch("http://localhost:3000/api/contacts/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Важливо для відправки cookies
          body: JSON.stringify(contactData),
        });

        // Перевіряємо, чи все пройшло успішно
        if (!response.ok) {
          const errorData = await response.text();  // Якщо сервер повертає текстову помилку
          throw new Error(errorData || 'Error submitting the form');
        }

        const data = await response.json();
        console.log("Response from server:", data);

        // Відкриваємо діалог після успішної відправки
        setOpenNew(true);
        setName('');
        setPhone('');
      } catch (error) {
        console.error("Failed to submit the form:", error.message);
      } finally {
      setLoading(false);
    }
   };

  const [name, setName] = React.useState('');
  const [phone, setPhone] = React.useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setPhone(event.target.value);
  };

  const isButtonDisabled = () => {
    return name.trim() === '' || phone.trim() === '';
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const userPage = () => {
    navigate("/mypage");
   };

  const logout = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/auth/logout", {
        method: "GET",
        credentials: "include", // Додає cookies у запит
      });
      if (response.ok) {
        navigate("/signIn");
         window.location.reload();// Перенаправлення на сторінку входу
      } else {
        console.error("Помилка логауту");
      }
    } catch (error) {
      console.error("Помилка логауту:", error);
    }
  };
 
  const handleHome = () => {
    navigate('/');
  }

  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'space-between' }}>
        <Button size="small" onClick={handleHome}>
          <img src={logo} alt="Logo" style={{ width: 52, height: 62 }}/>
        </Button>
        <Box sx={{ display: 'flex', height: '100%' }}>
          <Tabs
              value={value === null ? false : value} onChange={handleChange} aria-label="Tabs"
          >
              <Tab label="About" value={0}/>
              <Tab label="Store" value={1}/>
              <Tab label="Delivery" value={2}/>
          </Tabs>
        </Box>
        <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
          <div>
            {isAuthenticated ? (
                <Avatar 
                  alt="Remy Sharp" 
                  src={avatarUrl ? `http://localhost:3000${avatarUrl}` : modal} 
                  onClick={handleMenu} 
                  sx={{ cursor: 'pointer',
                        transition: '0.3s',
                        border: isAuthenticated ? '3px solidrgb(213, 151, 35)' : 'none',
                        '&:hover': { transform: 'scale(1.1)', border: '3px solidrgb(243, 93, 33)' },
                        '&:active': { transform: 'scale(0.95)', opacity: 0.7 },
                        marginRight: 2
                  }} 
                />
              ) : (
                <IconButton
                  onClick={handleMenu}
                >
                  <PersonOutlineOutlinedIcon />
                </IconButton>
              )}
          <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
              >
                {isAuthenticated ? (
                <>
                  <MenuItem onClick={userPage}>Your Page</MenuItem>
                  <MenuItem onClick={logout}>Log out</MenuItem>
                </>
              ) : (
                <>
                <MenuItem onClick={() => navigate('/signup')}>Sign up</MenuItem>
                <MenuItem onClick={() => navigate('/signin')}>Sign in</MenuItem>
                </>
              )}
              </Menu>
          </div>
          <IconButton onClick={handleOpen}><HeadsetMicOutlinedIcon /></IconButton>
        </Box>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <img src={contact} alt="greetengsflower"/>
          <DialogTitle id="alert-dialog-title">
            {"Contact us"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
                If you have any additional questions or you want to clarify something before you make an order please fill in your contact details.
                We will call you back.
            </DialogContentText>
            {loading ? (
            <Stack spacing={1}>
              <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
              <Skeleton variant="rectangular" width={210} height={40} />
            </Stack>
            ) : (
                <div style={{ display: 'flex', justifySelf: 'center', flexDirection: 'column', gap: '10px', width: '50%' }}>
            <TextField
                  id="standard-name"
                  label="Your name"
                  type="name"
                  variant="standard"
                  onChange={handleNameChange}
                  value={name}
                />
                <TextField
                  id="standard-email"
                  label="Your phone"
                  type="number"
                  variant="standard"
                  onChange={handleEmailChange}
                  value={phone}
                />
                  </div>
          )}
          </DialogContent>
          <DialogActions style={{ alignSelf: 'center'}}>
              <div style={{ display: 'flex' }}>
                <Button
                  variant="outlined"
                  onClick={handleOpenNew}
                  disabled={isButtonDisabled()}
                  style={{ marginBottom: '32px', backgroundColor: '#ff4e00', color: 'white', padding: '6px 24px' }}
                >
                {loading ? 'Sending...' : 'Send'}
                </Button>
               <Dialog
                  open={openNew}
                  onClose={handleCloseNew}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                    <img src={modal} alt="greetengsflower" style={{ padding: '64px' }}/>
                    <DialogTitle id="alert-dialog-title">
                    {"Thank you ❤️"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        We have received your contact details and will reach you soon.
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions style={{ alignSelf: 'center', width: '70%'}}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}> 
                        <Button
                          onClick={handleCloseNew}
                          
                          variant="outlined"
                          style={{ marginBottom: '32px', backgroundColor: '#ff4e00', color: 'white', padding: '6px 24px' }}
                        >
                            Continue
                        </Button>
                      </div>
                    </DialogActions>
                </Dialog>
            </div>
          </DialogActions>
      </Dialog>
      </Toolbar>     
    </React.Fragment>
  );
}

export default Header;