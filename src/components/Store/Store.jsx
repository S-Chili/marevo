import * as React from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from '@mui/material';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import flower1 from './flowersImage1.jpg';
import flower2 from './flowersImage2.jpg';
import flower3 from './flowersImage3.jpg';
import flower4 from './bouquet4.png';
import flower5 from './bouquet5.png';
import flower6 from './bouquet6.png';
import flower7 from './bouquet7.png';
import flower8 from './bouquet8.png';
import flower9 from './bouquet9.avif';
import flower10 from './bouquet10.avif';
import flower11 from './bouquet11.avif';
import flower12 from './bouquet12.avif';


export default function Store() {

    const [open, setOpen] = React.useState(false);
    const [selectedItem, setSelectedItem] = React.useState(null);
    const [openNew, setOpenNew] = React.useState(false);
    const [name, setName] = React.useState('');
    const [phone, setPhone] = React.useState('');
    
  const handleClose = () => {
      setOpen(false);
      setSelectedItem(null); 
  };
    
  const handleOpen = (item) => {
      setOpen(true);
      setSelectedItem(item);
  };

  const handleCloseNew = () => {
    setOpenNew(false);
    setOpen(false);
  };
  const handleOpenNew = () => {
    setOpenNew(true);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const isButtonDisabled = () => {
    return name.trim() === '' || phone.trim() === '';
  };

    return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: '50px', paddingLeft: '24px', paddingRight: '24px' }}>
      <div style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          sx={{ 
            flexShrink: 0, 
            fontSize: '2.5rem',
            whiteSpace: 'nowrap',
            textAlign: 'start',
            paddingLeft: '8px',
            paddingRight: '24px',
            margin: '16px 0 16px 0', // Встановити верхній та нижній відступ
          }}
        >
          Store
        </Typography>
        <hr style={{ flex: 1, border: 'none', borderBottom: '2px solid black', margin: '0', marginRight: '8px',}} />
      </div>
      <ImageList sx={{ width: '50%', height: 'auto' }} cols={2} gap={20}>
        {itemData.map((item) => (
          <ImageListItem key={item.img}>
            <img
              srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
              src={`${item.img}?w=248&fit=crop&auto=format`}
              alt={item.title}
              loading="lazy"
            />
            <ImageListItemBar
              title={item.title}
              subtitle={item.price}
              actionIcon={
                <IconButton
                  sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                  aria-label={`info about ${item.title}`}
                  onClick={() => handleOpen(item)}
                >
                  <ShoppingCartOutlinedIcon />
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>

      <Dialog
  open={open}
  onClose={handleClose}
  aria-labelledby="alert-dialog-title"
  aria-describedby="alert-dialog-description"
>
  {selectedItem && (
    <>
      <div style={{ display: 'grid', gridTemplateRows: '1fr auto auto', maxHeight: '700px' }}>
        <div style={{ height: '90%', overflow: 'hidden' }}>
          <img 
            src={selectedItem.img} 
            alt="greetengsflower" 
            style={{ width: '100%', objectFit: 'cover', height: '100%' }} 
          />
        </div>
        <DialogTitle id="alert-dialog-title">
          {"Your order:"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bouquet "{selectedItem.title}", it costs {selectedItem.price}. 
            Please enter your contact details, our manager will contact you within 30 minutes to clarify the delivery address and pay for the order!
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ alignSelf: 'center', width: '70%', justifySelf: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>
            <TextField
              id="standard-name"
              label="Your name"
              type="name"
              variant="standard"
              onChange={handleNameChange}
            />
            <TextField
              id="standard-phone"
              label="Your phone"
              type="phone"
              variant="standard"
              onChange={handlePhoneChange}
            />
            <Button
              variant="outlined"
              onClick={handleOpenNew}
              disabled={isButtonDisabled()}
              style={{ marginBottom: '32px', backgroundColor: '#ff4e00', color: 'white', padding: '6px 24px' }}
            >
              Send
            </Button>
          </div>
        </DialogActions>
      </div>
    </>
  )}
</Dialog>

      <Dialog
        open={openNew}
        onClose={handleCloseNew}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
            >
                {selectedItem && (
                    <>
                        <img src={selectedItem.img} alt="greetengsflower" style={{ padding: '64px' }} />
                        <DialogTitle id="alert-dialog-title">
                            {"Thank you for your order ❤️"}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                We have received your contact details and will reach you soon.
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions style={{ alignSelf: 'center', width: '70%' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>
                                <Button
                                    onClick={handleCloseNew}
                                    disabled={isButtonDisabled()}
                                    variant="outlined"
                                    style={{ marginBottom: '32px', backgroundColor: '#ff4e00', color: 'white', padding: '6px 24px' }}
                                >
                                    Continue
                                </Button>
                            </div>
                        </DialogActions>
                    </>
                )}
      </Dialog>
    </Box>
  );
}

const itemData = [
  {
    img: flower12,
    title: 'Red Desire',
    price: '1300 Uah',
    rows: 2,
    cols: 2,
    featured: true,
  },
  {
    img: flower1,
    title: 'Narcissic',
    price: '400 Uah',
  },
  {
    img: flower2,
    title: 'Field mood',
    price: '700 Uah',
  },
  {
    img: flower3,
    title: 'Fireshow',
    price: '700 Uah',
    cols: 2,
  },
  {
    img: flower4,
    title: 'Mavka',
    price: '450 Uah',
    cols: 2,
  },
  {
    img: flower5,
    title: 'Piano',
    price: '350 Uah',
    rows: 2,
    cols: 2,
    featured: true,
  },
  {
    img: flower6,
    title: 'Birdy',
    price: '650 Uah',
  },
  {
    img: flower7,
    title: 'Cream wish',
    price: '650 Uah',
  },
  {
    img: flower8,
    title: 'Lifefire',
    price: '750 Uah',
    rows: 2,
    cols: 2,
  },
  {
    img: flower9,
    title: 'Pink dream',
    price: '700 Uah',
  },
  {
    img: flower10,
    title: 'Sea star',
    price: '650 Uah',
  },
  {
    img: flower11,
    title: 'Bright tear',
    price: '850 Uah',
    cols: 2,
  },
];