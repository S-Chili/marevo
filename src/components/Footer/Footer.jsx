import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import footLogo from '../../logo512.png'
import { Button, Tab, Tabs } from '@mui/material';

function Copyright() {
  return (
    <Typography variant="body2" color='lightgray'>
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
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'flex-start' }}>
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
                    >
                        <Tab label="About" value={0} sx={{ color: 'lightgray'}}/>
                        <Tab label="Store" value={1} sx={{ color: 'lightgray'}}/>
                        <Tab label="Delivery" value={2} sx={{ color: 'lightgray'}}/>
                    </Tabs>
                  </Box>
                  <Box>
                      
                  </Box>
                  <Box>
                      
                  </Box>
                  <Box>
                      
                  </Box>
            </Box>
          <Container maxWidth="sm">
            <Copyright />
          </Container>
        </Box>
    </ThemeProvider>
  );
}