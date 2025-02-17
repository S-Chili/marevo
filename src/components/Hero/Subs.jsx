import * as React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Button } from '@mui/material';
import subs from './subscribe.jpg';
import modal from '../Header/pop up_desktop/Frame 48.jpg';

export default function Subs({ open, handleClose }) {
  const [email, setEmail] = React.useState('');
  const [openNew, setOpenNew] = React.useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const isButtonDisabled = () => email.trim() === '';

  const handleSubmit = async () => {
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
        </DialogContent>
        <DialogActions style={{ flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
          <TextField
            id="standard-email"
            label="Your email"
            type="email"
            variant="standard"
            onChange={handleEmailChange}
          />
          <Button
            onClick={handleSubmit}
            disabled={isButtonDisabled()}
            variant="outlined"
            style={{ backgroundColor: '#ff4e00', color: 'white', padding: '6px 24px' }}
          >
            Send
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
