import * as React from 'react';
import { Box, Grid, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import DoneTwoToneIcon from '@mui/icons-material/DoneTwoTone';
import delivery from './delivery.png';

const Delivery = React.forwardRef(({ tabLabel }, ref) => {
    return (
      <>
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
            fontSize: '2.5rem',
            whiteSpace: 'nowrap',
            textAlign: 'start',
            paddingLeft: '8px',
            paddingRight: '24px',
            margin: '16px 0 16px 0', // Встановити верхній та нижній відступ
          }}
        >
          Delivery {tabLabel}
        </Typography>
        <hr style={{ flex: 1, border: 'none', borderBottom: '2px solid black', margin: '0', marginRight: '8px',}} />
      </div>
         <Grid item xs={12} md={6} style={{ placeSelf: 'start', marginLeft: '30px', marginBottom: '60px' }}>
            <List >
                <ListItem>
                  <ListItemIcon>
                    <DoneTwoToneIcon />
                  </ListItemIcon>
                      <ListItemText
                          primary="Choose your bouquet and make an order on website"
                          primaryTypographyProps={{ sx: { fontSize: '1.75rem' } }}
                  />
                  </ListItem>
                  <ListItem>
                  <ListItemIcon>
                    <DoneTwoToneIcon />
                  </ListItemIcon>
                      <ListItemText
                    primary="Wait for the call to clarify the details of the order.
You can pay online or to the courier"
                    primaryTypographyProps={{ sx: { fontSize: '1.75rem' } }}

                  />
                  </ListItem>
                  <ListItem>
                  <ListItemIcon>
                    <DoneTwoToneIcon />
                  </ListItemIcon>
                      <ListItemText
                    primary="Wait for the delivery at the selected time or pick up
the order from the store "
                    primaryTypographyProps={{ sx: { fontSize: '1.75rem' } }}
                   />
                  </ListItem>
                  <ListItem>
                  <ListItemIcon>
                    <DoneTwoToneIcon />
                  </ListItemIcon>
                      <ListItemText
                          primary="Make someone happy or enjoy yourself"
                          primaryTypographyProps={{ sx: { fontSize: '1.75rem' } }}
                  />
                </ListItem>
            </List>
        </Grid>   
      </Box>
              <img src={delivery} alt="greetengsflower" style={{ width: '100%', marginBottom: '-10px' }} />  
          </>
  );
})

export default Delivery;