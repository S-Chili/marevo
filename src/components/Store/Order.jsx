import React from "react";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Button } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export default function Order({ open, selectedItem, handleClose }) {
  const [openNew, setOpenNew] = React.useState(false);
  const [name, setName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleNameChange = (event) => setName(event.target.value);
  const handlePhoneChange = (event) => setPhone(event.target.value);
  const isButtonDisabled = () => {
    return name.trim() === '' || phone.trim() === ''
  };

  const handleCloseNew = () => {
    setOpenNew(false);
    handleClose();
  };
  
  const userId = localStorage.getItem("userId");

  const handleOrderSubmit = async () => {
        setLoading(true);
        const formData = {
            userID: userId,
            name: name,
            phone: phone,
            bouquetTite: selectedItem.title,
            bouquetPrice: selectedItem.price,
            bouquetImg: selectedItem.img,
        };

        console.log("formData:", formData);

        try {
            const response = await fetch("http://localhost:3000/api/orders", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
                credentials: "include",
            });

            const data = await response.json();
            console.log("Відповідь сервера:", data);
            if (response.ok) {
              setOpenNew(true);
            } else {
                console.error("Error adding order:", data.message);
            }
        } catch (error) {
            console.error("Request failed:", error);
        } finally {
      setLoading(false);
    }
    };   

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        {selectedItem && (
          <>
            <img src={selectedItem.img} alt="Order item" style={{ width: '100%', objectFit: 'cover' }} />
            <DialogTitle>Your order:</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Bouquet "{selectedItem.title}" costs {selectedItem.price} UAH.
                Please enter your contact details, our manager will contact you within 30 minutes.
              </DialogContentText>
              {loading ? (
            <Stack spacing={1}>
              <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
              <Skeleton variant="rectangular" width={210} height={40} />
            </Stack>
            ) : (
              <div style={{ gap: '10%', alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
                <TextField id="standard-name" label="Your name" variant="standard" onChange={handleNameChange} />
                <TextField id="standard-phone" label="Your phone" variant="standard" onChange={handlePhoneChange} />
              </div>
          )}
            </DialogContent>
            <DialogActions style={{ flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
              <Button
                variant="outlined"
                onClick={handleOrderSubmit}
                disabled={isButtonDisabled()}
                style={{ backgroundColor: '#ff4e00', color: 'white', padding: '6px 24px' }}
              >
                {loading ? 'Sending...' : 'Send'}
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      <Dialog open={openNew} onClose={handleCloseNew}>
        {selectedItem && (
          <>
            <img src={selectedItem.img} alt="Order confirmed" style={{ padding: '64px' }} />
            <DialogTitle>Thank you for your order ❤️</DialogTitle>
            <DialogContent>
              <DialogContentText>We have received your contact details and will reach you soon.</DialogContentText>
            </DialogContent>
            <DialogActions style={{ justifyContent: 'center' }}>
              <Button
                onClick={handleCloseNew}
                variant="outlined"
                style={{ backgroundColor: '#ff4e00', color: 'white', padding: '6px 24px' }}
              >
                Continue
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </>
  );
}
