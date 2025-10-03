import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { Box, Button, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import logoM from "./marevo_logo.png";
import flower1 from "./flowers2.jpg";
import flower2 from "./flowers1.jpg";
import flower3 from "./flowers3.jpg";
import Subs from "./Subs";

// Прибираємо DESKTOP_PADDING_Y

export default function Hero() {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  
  const getCols = () => {
    if (isMobile) return 1;
    if (isTablet) return 2;
    return 3;
  };

  const imageListVariant = "standard";

   const getWovenSizes = (index) => {
    if (!isDesktop) {
      return {}; 
    }
     
    const isSmall = index === 0 || index === 2;

    // ТІЛЬКИ Grid-властивості
    return {
     cols: 1,
     rows: isSmall ? 1 : 2,
    };
   };
  
  const standardRowHeight = isDesktop ? 200 : isTablet ? 300 : 220;
  // Висота ImageList залишається 408px
  const desktopHeight = standardRowHeight * 2 + 8; 
  
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        mt: { xs: 6, sm: 10 }, 
        px: 2,
      }}
    >
      {/* Логотип і картинки */}
      <Box
        sx={{
          width: "100%",
          maxWidth: 1100,
          textAlign: "center",
          position: "relative",
        }}
      >
        <Box
          component="img"
          src={logoM}
          alt="marevo"
          sx={{
            position: "relative",
            zIndex: 1,
            maxWidth: { xs: "70%", sm: "60%", md: "40%" },
            height: "auto",
          }}
        />


  <ImageList
    variant={imageListVariant}
    cols={getCols()}
    gap={8}
    rowHeight={standardRowHeight}
    sx={{
      overflow: "hidden",
      width: isDesktop ? 'fit-content' : "100%",
      margin: isDesktop ? '0 auto' : '0', 
      justifyItems: "center",
      mt: { xs: -3, sm: -5, md: -11 },
      height: isDesktop ? desktopHeight : { xs: 220, sm: 300, md: 400 }
    }}
  >
  {itemData.slice(0, getCols()).map((item, index) => {
    const { cols, rows } = getWovenSizes(index);

    return (
      <ImageListItem
        key={item.img}
        cols={cols}
        rows={rows}
        // !!! ПОВЕРТАЄМО СТАНДАРТНІ СТИЛІ
        sx={{
          width: "100%",
          height: '100%',
          maxWidth: isDesktop ? 'none' : 400, 
          mx: isDesktop ? 0 : "auto",
          // Видаляємо всі конфліктуючі стилі
        }}
      >
        {/* !!! ОСНОВНА ЗМІНА: Обгортаємо img в Box для центрування */}
        <Box 
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center', // Вертикальне центрування
            justifyContent: 'center', // Горизонтальне центрування
          }}
        >
          <img
            src={item.img}
            alt={item.title}
            // Зображення має займати всю доступну ширину обгортки
            style={{
              width: "100%",
              // Висота auto, щоб object-fit працював без спотворень
              height: "auto", 
              maxHeight: '100%', // Обмежуємо максимальну висоту для центрування
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
        </Box>
      </ImageListItem>
    );
  })}
  </ImageList>

      </Box>

     {/* Текст і кнопка */}

<Box

sx={{

display: "flex",

flexDirection: "column",

gap: 2,

alignItems: "center",

mt: 3,

}}

>

<Typography

component="h2"

variant={isMobile ? "h6" : "h5"}

align="center"

>

Follow our newsletter

</Typography>

<Button

onClick={handleOpen}

variant="contained"

sx={{

borderRadius: "20px",

backgroundColor: "orange",

color: "white",

px: 3,

py: 1,

"&:hover": {

backgroundColor: "#e69500",

},

}}

>

Subscribe

</Button>

</Box>



{/* Модальне вікно */}

<Subs open={open} handleClose={handleClose} />

</Box>

);

}

const itemData = [
  { img: flower1, title: "bloom" },
  { img: flower2, title: "Flower" },
  { img: flower3, title: "Flower" },
];