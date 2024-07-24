
import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import flower1 from './flowers2.jpg';
import flower2 from './flowers1.jpg';
import flower3 from './flowers3.jpg';
import { useMemo } from 'react';
import { Box } from '@mui/material';

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

    return (
     <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ width: '1100px'}}>
            <ImageList variant="woven" cols={3} gap={8} style={{ overflow: 'hidden', justifyItems: 'center' }}>
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
    </Box>
  );
}

const itemData = [
  
  {
    img: flower1,
    title: 'Flower',
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