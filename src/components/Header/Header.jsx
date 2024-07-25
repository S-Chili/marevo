import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import HeadsetMicOutlinedIcon from '@mui/icons-material/HeadsetMicOutlined';
import logo from '../../logo192.png'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material';


function Header() {

  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
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

  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'space-between' }}>
        <Button size="small" >
          <img src={logo} alt="Logo" style={{ width: 52, height: 62 }}/>
        </Button>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px' }}>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 0.5 }}
        >
          Marevo
              </Typography>
              <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 0.5 }}
        >
          About us
              </Typography>
              <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 0.5 }}
        >
          Store
              </Typography>
              <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 1 }}
        >
          Delivery
              </Typography>
              <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 0.5 }}
        >
          Blog
          </Typography>
        </div>
        <IconButton onClick={handleOpen}><HeadsetMicOutlinedIcon /></IconButton>
        
        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
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
              />
              <TextField
                id="standard-email"
                label="Your email"
                type="email"
                variant="standard"
                onChange={handleEmailChange}
              />
              <Button
                variant="outlined"
                disabled={isButtonDisabled()}
                style={{ marginBottom: '32px' }}>
              Send
            </Button>
            </div>
            
          </DialogActions>
          
      </Dialog>
        
      </Toolbar>
      
    </React.Fragment>
  );
}

export default Header;

// import * as React from 'react';
// import Button from '@mui/material/Button';
// import Stack from '@mui/material/Stack';

// export default function OutlinedButtons() {
//   return (
//     <Stack direction="row" spacing={2}>
//       <Button variant="outlined">Primary</Button>
//       <Button variant="outlined" disabled>
//         Disabled
//       </Button>
//       <Button variant="outlined" href="#outlined-buttons">
//         Link
//       </Button>
//     </Stack>
//   );
// }