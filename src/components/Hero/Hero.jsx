
import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import flower1 from './flowers2.jpg';
import flower2 from './flowers1.jpg';
import flower3 from './flowers3.jpg';
import subs from './subscribe.jpg';
import logoM from './marevo_logo.png';
import modal from '../Header/pop up_desktop/Frame 48.jpg'
import { useMemo } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from '@mui/material';

const useStyles = () => {
  return useMemo(() => {
    const styles = [];
    for (let i = 0; i < itemData.length; i++) {
      if (i % 2 === 0) {
        styles.push({ width: '315px', height: '369px' }); 
      } else {
        styles.push({ width: '391px', height: '421px' }); 
      }
    }
    return styles;
  }, []);
};

export default function Hero() {
  const styles = useStyles();

  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const [openNew, setOpenNew] = React.useState(false);

   const handleOpenNew = async () => {
  // Створюємо об'єкт з ім'ям і email
  const contactData = {
    email: email.trim(),
  };

  try {
    // Відправляємо дані на сервер
    const response = await fetch("http://localhost:3000/api/subscribes/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contactData),
    });

    // Перевіряємо, чи все пройшло успішно
    if (!response.ok) {
      throw new Error("Error submitting the form");
    }

    const data = await response.json();
    console.log("Response from server:", data);

    // Відкриваємо діалог після успішної відправки
    setOpenNew(true);
    setEmail('');
  } catch (error) {
    console.error("Failed to submit the form:", error.message);
  }
   };
  
   const handleCloseNew = () => {
     setOpen(false);
     setOpenNew(false);
  };

  const [email, setEmail] = React.useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

   const isButtonDisabled = () => {
    return email.trim() === '';
   };
       
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: '100px' }}>
        <div style={{ width: '1100px', textAlign: 'center', position: 'relative' }}>
            <img src={logoM} alt="marevo" style={{ position: 'relative', zIndex: '1' }}/>
            <ImageList variant="woven" cols={3} gap={8} style={{ overflow: 'hidden', justifyItems: 'center', marginTop: '-60px' }}>
                {itemData.map((item, index) => (
                    <ImageListItem key={item.img} style={styles[index]}>
                    <img
                        srcSet={`${item.img}?w=161&fit=crop&auto=format&dpr=2 2x`}
                        src={`${item.img}?w=161&fit=crop&auto=format`}
                        alt={item.title}
                        
                    />
                    </ImageListItem>
                ))}
          </ImageList>
        </div>
        <DialogActions style={{ alignSelf: 'center'}}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
              <Typography
                  component="h2"
                  variant="h5"
                  color="inherit"
                  align="center"
                  noWrap
                  sx={{ flex: 0.5, margin: '16px 0' }}
                >
                  Follow to our newsletter
              </Typography>
              <Button
                onClick={handleOpen}
                variant="contained"
                style={{ marginBottom: '32px', borderRadius: '20px', backgroundColor: 'orange', color: 'white', padding: '6px 24px' }}>
                Subscribe
              </Button>
          </div>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <img src={subs} alt="greetengsflower"/>
            <DialogTitle id="alert-dialog-title">
             {"Follow to our newsletter"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Be the first  to get exclusive offers and the latest  news on our product directly in your box.
              </DialogContentText>
            </DialogContent>
             <DialogActions style={{ alignSelf: 'center', width: '70%'}}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>
                  <TextField
                    id="standard-email"
                    label="Your email"
                    type="email"
                    variant="standard"
                    onChange={handleEmailChange}
                  />
                <Button
                  onClick={handleOpenNew}
                  disabled={isButtonDisabled()}
                  variant="outlined"
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
                  <img src={modal} alt="greetengsflower"/>
                  <DialogTitle id="alert-dialog-title">
                  {"Thank you!"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      Thanks for your subscribe ❤️
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
            
        </DialogActions>
        
    </Box>
  );
}

const itemData = [
  
  {
    img: flower1,
    title: 'bloom',
  },
  {
    img: flower2,
    title: 'Flower',
  },
 
  {
    img: flower3,
    title: 'Flower',
    },
];