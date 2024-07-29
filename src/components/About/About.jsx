import * as React from 'react';
import about from './image_about.jpg';
import { Box, Typography } from '@mui/material';

export default function About() {
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
          About
        </Typography>
        <hr style={{ flex: 1, border: 'none', borderBottom: '2px solid black', margin: '0', marginRight: '8px',}} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: '80px' }}>
        <Typography
          component="h5"
          variant="h5"
          color="inherit"
          align="center"
          sx={{ maxWidth: '100%', margin: '16px 0', textAlign: 'justify', flex: 0.7 }}
        >
          We are a minimalistic flower studio. We love people and flowers.
          Therefore, every day we give people the beauty and joy creating stylish and modern masterpieces.
          Every bouquet we create is unique as you are.
        </Typography>   
        <img src={about} alt="greetengsflower" style={{ maxWidth: '100%', height: 'auto', flex: 0.3 }} />  
      </div>        
    </Box>
  );
}