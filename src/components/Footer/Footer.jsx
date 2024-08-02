import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import footLogo from '../../logo512.png';
import { Button, Tab, Tabs } from '@mui/material';
import FaceLogo from './facebook.png';
import InstaLogo from './instagram.png';

function Copyright() {
  return (
    <Typography variant="body2" color='lightgray' sx={{textAlign: 'center'}}>
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/S-Chili">
        Check developer
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Footer({ value, handleChange }) {
  return (
    <ThemeProvider theme={defaultTheme}>
        <Box
          component="footer"
          sx={{
            py: 3,
            px: 2,
            mt: 'auto',
            backgroundColor: '#000000c9',
            textAlign: 'center'
          }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'self-start' }}>
                  <Box sx={{ alignSelf: 'center' }}>
                    <Button size="small" >
                        <img src={footLogo} alt="Logo" style={{ width: 52, height: 62 }}/>
                    </Button>
                  </Box> 
                  <Box sx={{ display: 'flex', height: '100%' }}>
                    <Tabs
                        orientation="vertical"
                        value={value === null ? false : value} onChange={handleChange} aria-label="Tabs"
                        sx={{ borderRight: 1, borderColor: 'divider' }}
                        TabIndicatorProps={{ style: { display: 'none' } }}
                    >
                        <Tab label="About" value={0} sx={{ color: 'lightgray'}}/>
                        <Tab label="Store" value={1} sx={{ color: 'lightgray'}}/>
                        <Tab label="Delivery" value={2} sx={{ color: 'lightgray'}}/>
                    </Tabs>
                  </Box>
                  <Box sx={{ textAlign: 'start', marginLeft: 2, display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="h6" color="lightgray" sx={{fontSize: '1.15rem', marginBottom: '10px'}}>
                      Opening times
                    </Typography>
                    <Typography variant="body2" color="lightgray">
                      Every day
                    </Typography>
                    <Typography variant="body2" color="lightgray">
                      9:00 - 22:00
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: 'start', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <Typography variant="h6" color="lightgray" sx={{fontSize: '1.15rem'}}>
                        Contacts
                      </Typography>
                       <Typography variant="body2" color="lightgray">
                        +38 063 123 45 67
                      </Typography>
                       <Typography variant="body2" color="lightgray">
                        marevostudio@example.com
                      </Typography>
                       <Typography variant="body2" color="lightgray">
                          Reitarska Street, 11<br/>
                          Kyiv, Ukraine
                      </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, alignSelf: 'center' }}>
                      <Button size="small">
                        <img src={FaceLogo} alt="Facebook" />
                      </Button>
                      <Button size="small">
                        <img src={InstaLogo} alt="Instagram"/>
                    </Button>
                  </Box>
            </Box>
          <Container maxWidth="sm">
          <Copyright/>
          </Container>
        </Box>
    </ThemeProvider>
  );
}
