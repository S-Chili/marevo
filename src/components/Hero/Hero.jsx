import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Box, Button, Typography } from '@mui/material';
import logoM from './marevo_logo.png';
import flower1 from './flowers2.jpg';
import flower2 from './flowers1.jpg';
import flower3 from './flowers3.jpg';
import Subs from './Subs';

export default function Hero() {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: '100px' }}>
      <div style={{ width: '1100px', textAlign: 'center', position: 'relative' }}>
        <img src={logoM} alt="marevo" style={{ position: 'relative', zIndex: '1' }} />
        <ImageList variant="woven" cols={3} gap={8} style={{ overflow: 'hidden', justifyItems: 'center', marginTop: '-60px' }}>
          {itemData.map((item) => (
            <ImageListItem key={item.img} style={{ width: '350px', height: '400px' }}>
              <img src={item.img} alt={item.title} />
            </ImageListItem>
          ))}
        </ImageList>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
        <Typography component="h2" variant="h5" align="center" sx={{ margin: '16px 0' }}>
          Follow our newsletter
        </Typography>
        <Button onClick={handleOpen} variant="contained" style={{ borderRadius: '20px', backgroundColor: 'orange', color: 'white', padding: '6px 24px' }}>
          Subscribe
        </Button>
      </div>

      {/* Модальне вікно */}
      <Subs open={open} handleClose={handleClose} />
    </Box>
  );
}

const itemData = [
  { img: flower1, title: 'bloom' },
  { img: flower2, title: 'Flower' },
  { img: flower3, title: 'Flower' },
];
