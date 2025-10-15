import * as React from 'react';
import { Box, Typography } from '@mui/material';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import {useAuth} from "../Header/AuthForm";
import Order from './Order';
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
import { useNavigate } from 'react-router';

const Store = React.forwardRef(({ tabLabel }, ref) => {
  const [open, setOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState(null);
  const [favs, setFavs] = React.useState([]); // Масив замість Set
  
  const API_URL = process.env.REACT_APP_API_URL;
  const { isAuthenticated, user } = useAuth();
  const userId = user?._id;
  const navigate = useNavigate();

  const handleOpen = (item) => {
    setOpen(true);
    setSelectedItem(item);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedItem(null);
  };

  React.useEffect(() => {
  const fetchFavorites = async () => {
    if (!userId) {
          setFavs([]);
          return;
      }

    try {
      const response = await fetch(`${API_URL}/api/favorites/${userId}`, {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const favsData = await response.json();
        setFavs(favsData); // Тепер `favs` міститиме об'єкти, а не тільки `img`
      } else {
        console.error("Error fetching favorites");
      }
    } catch (error) {
      console.error("Request failed:", error);
    }
  };

  fetchFavorites();
}, [API_URL, userId]);

const toggleFavorite = async (item) => {
  const existingFav = favs.find(fav => fav.bouquetImg === item.img);

  if (existingFav) {
    await deleteFav(existingFav._id);
  } else {
    await handleFavSubmit(item);
  }
};

 const handleFavSubmit = async (item) => {
  if (!userId || !item) return;

  const formData = {
    userID: userId,
    bouquetTitle: item.title,
    bouquetPrice: item.price,
    bouquetImg: item.img,
  };

  try {
    const response = await fetch(`${API_URL}/api/favorites`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
      credentials: "include",
    });

    const data = await response.json();
    if (response.ok) {
      setFavs(prevFavs => [...prevFavs, { _id: data.insertedId, bouquetImg: item.img }]);
      console.log("Added to favorites:", data);
    } else {
      console.error("Error adding to favorites:", data.message);
    }
  } catch (error) {
    console.error("Request failed:", error);
  }
};

const deleteFav = async (favId) => {
  if (!favId) return;

  try {
    const response = await fetch(`${API_URL}/api/favorites/${favId}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (response.ok) {
      setFavs(prevFavs => prevFavs.filter(fav => fav._id !== favId)); 
      console.log("Favorite deleted successfully");
    } else {
      console.error("Error deleting favorite item");
    }
  } catch (error) {
    console.error("Request failed:", error);
  }
};
  
  const handleProtectedClickFav = (item) => {
        if (!isAuthenticated) {
            navigate('/signup'); 
        } else {
          
          toggleFavorite(item);
        }
  };
  
  const handleProtectedClickOrder = (item) => {
        if (!isAuthenticated) {
            navigate('/signup'); 
        } else {
            handleOpen(item);
        }
    };
  

  return (
    <Box ref={ref} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: '50px', paddingLeft: '24px', paddingRight: '24px' }}>
      <div style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
        <Typography
          component="h2"
          variant="h5"
          align="center"
          sx={{ flexShrink: 0, fontSize: '2.5rem', textAlign: 'start', paddingLeft: '8px', paddingRight: '24px', margin: '16px 0' }}
        >
          Store {tabLabel}
        </Typography>
        <hr style={{ flex: 1, border: 'none', borderBottom: '2px solid black', marginRight: '8px' }} />
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
              subtitle={`${item.price} UAH`}
              actionIcon={
                <Box sx={{ display: 'flex', gap: 1, paddingRight: '8px' }}>
                  <IconButton
                    sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                    aria-label={`Add ${item.title} to cart`}
                    onClick={() => handleProtectedClickOrder(item)}
                  >
                    <ShoppingCartOutlinedIcon />
                  </IconButton>
                  <IconButton
                    sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                    aria-label={`Add ${item.title} to favorites`}
                    onClick={() => handleProtectedClickFav(item)}
                  >
                    {favs.some(fav => fav.bouquetImg === item.img) 
                      ? <FavoriteOutlinedIcon /> 
                      : <FavoriteBorderOutlinedIcon />}
                  </IconButton>
                </Box>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>

      {/* Modal window for ordering */}
      <Order open={open} selectedItem={selectedItem} handleClose={handleClose} />
    </Box>
  );
});


const itemData = [
  { img: flower12, title: 'Red Desire', price: '1300' },
  { img: flower1, title: 'Narcissic', price: '400' },
  { img: flower2, title: 'Field mood', price: '700' },
  { img: flower3, title: 'Fireshow', price: '700' },
  { img: flower4, title: 'Mavka', price: '450' },
  { img: flower5, title: 'Piano', price: '350' },
  { img: flower6, title: 'Birdy', price: '650' },
  { img: flower7, title: 'Cream wish', price: '650' },
  { img: flower8, title: 'Lifefire', price: '750' },
  { img: flower9, title: 'Pink dream', price: '700' },
  { img: flower10, title: 'Sea star', price: '650' },
  { img: flower11, title: 'Bright tear', price: '850' },
];

export default Store;
