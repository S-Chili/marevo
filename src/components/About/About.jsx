import * as React from 'react';
import about from './image_about.jpg';
import { Box, Typography } from '@mui/material';

const About = React.forwardRef(({ tabLabel }, ref) => {
  return (
    <Box ref={ref} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: '50px', paddingLeft: '24px', paddingRight: '24px' }}>
      <div style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          sx={{ 
            flexShrink: 0, 
            fontSize: { xs: '1.5rem', md: '2.5rem' },
            whiteSpace: 'nowrap',
            textAlign: 'start',
            paddingLeft: '8px',
            paddingRight: '24px',
            margin: '16px 0 16px 0', 
          }}
        >
          About {tabLabel}
        </Typography>
        <hr style={{ flex: 1, border: 'none', borderBottom: '2px solid black', margin: '0', marginRight: '8px',}} />
      </div>
      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          width: '100%', 
          
          flexDirection: {
            xs: 'column', 
            md: 'row',    
          },
          gap: {
            xs: '24px',
            md: '80px',
          }
        }}
      >
        <Typography
          component="h5"
          variant="h5"
          color="inherit"
          align="center"
          sx={{ 
            maxWidth: '100%', 
            margin: '16px 0', 
            textAlign: { xs: 'start', md: 'justify' }, 
            fontSize: { xs: '1.2rem', md: '1.8rem' },

            flex: { xs: 'none', md: 0.8 }, 
            width: { xs: '100%', md: 'auto' },
            
            order: { xs: 1, md: 1 },
          }}
        >
          We are a minimalistic flower studio. We love people and flowers.
          Therefore, every day we give people the beauty and joy creating stylish and modern masterpieces.
          Every bouquet we create is unique as you are.
        </Typography>   
        
        <Box
          component="img"
          src={about}
          alt="greetengsflower"
          sx={{ 
            flex: { xs: 'none', md: 0.2 }, 
            maxWidth: {xs: '100%', md: '60%'},
            height: 'auto',
            width: { xs: '100%', md: 'auto' },
            
            order: { xs: 2, md: 2 },
          }}
        /> 
      </Box>        
    </Box>
  );
});

export default About;