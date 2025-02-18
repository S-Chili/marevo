import * as React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Button } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import subs from './subscribe.jpg';
import modal from '../Header/pop up_desktop/Frame 48.jpg';

export default function Subs({ open, handleClose }) {
  const [email, setEmail] = React.useState('');
  const [openNew, setOpenNew] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const isButtonDisabled = () => email.trim() === '' || loading;

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/subscribes/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      if (!response.ok) throw new Error("Error submitting the form");

      setOpenNew(true);
      setEmail('');
    } catch (error) {
      console.error("Failed to submit the form:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseNew = () => {
    setOpenNew(false);
    handleClose();
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <img src={subs} alt="greeting flowers" />
        <DialogTitle>{"Follow our newsletter"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Be the first to get exclusive offers and the latest news on our product directly in your inbox.
          </DialogContentText>
          {loading ? (
            <Stack spacing={1}>
              <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
              <Skeleton variant="rectangular" width={210} height={40} />
            </Stack>
          ) : (
              <div style={{ display: 'flex', justifySelf: 'center', flexDirection: 'column', gap: '10px', width: '50%' }}>
            <TextField
              id="standard-email"
              label="Your email"
              type="email"
              variant="standard"
              onChange={handleEmailChange}
            />
                </div>
          )}
        </DialogContent>
        <DialogActions style={{ flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
          <Button
            onClick={handleSubmit}
            disabled={isButtonDisabled()}
            variant="outlined"
            style={{ backgroundColor: '#ff4e00', color: 'white', padding: '6px 24px' }}
          >
            {loading ? 'Sending...' : 'Send'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Діалог успішної підписки */}
      <Dialog open={openNew} onClose={handleCloseNew}>
        <img src={modal} alt="greeting flower" />
        <DialogTitle>{"Thank you!"}</DialogTitle>
        <DialogContent>
          <DialogContentText>Thanks for your subscription ❤️</DialogContentText>
        </DialogContent>
        <DialogActions style={{ justifyContent: 'center' }}>
          <Button onClick={handleCloseNew} variant="outlined" style={{ backgroundColor: '#ff4e00', color: 'white', padding: '6px 24px' }}>
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}