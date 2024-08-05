import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import HeadsetMicOutlinedIcon from '@mui/icons-material/HeadsetMicOutlined';
import logo from '../../logo192.png'
import modal from './pop up_desktop/Frame 48.jpg'
import contact from './contact.jpg'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Menu, MenuItem, Tab, Tabs, TextField } from '@mui/material';


function Header({ value, handleChange }) {
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
    setName(''); 
    setEmail('');
  };
  const handleOpen = () => {
    setOpen(true);
  };

   const [openNew, setOpenNew] = React.useState(false);
  const handleCloseNew = () => {
    setOpenNew(false);
    setOpen(false);
  };
  const handleOpenNew = () => {
    setOpenNew(true);
    setName(''); 
    setEmail('');
  };

  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const isButtonDisabled = () => {
    return name.trim() === '' || email.trim() === '';
  };

   const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

   const handleSignUp = () => {
    handleCloseMenu();
    navigate('/signup');
   };
  
  const handleHome = () => {
    navigate('/');
  }

  const handleSignIn = () => {
    handleCloseMenu();
    navigate('/signIn');
   };

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
            <IconButton
            onClick={handleMenu}
          >
            <PersonOutlineOutlinedIcon />
          </IconButton>
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
                <MenuItem onClick={handleSignUp}>Sigh up</MenuItem>
                <MenuItem onClick={handleSignIn}>Sign in</MenuItem>
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
          </DialogContent>
          <DialogActions style={{ alignSelf: 'center', width: '70%'}}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>
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
                  label="Your email"
                  type="email"
                  variant="standard"
                  onChange={handleEmailChange}
                  value={email}
                />
                <Button
                  variant="outlined"
                  onClick={handleOpenNew}
                  disabled={isButtonDisabled()}
                  style={{ marginBottom: '32px', backgroundColor: '#ff4e00', color: 'white', padding: '6px 24px' }}
                >
                Send
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

