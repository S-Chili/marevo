import React, { useState, useEffect } from "react";
import { useCallback } from "react";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import Avatar from '@mui/material/Avatar';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export default function ControlledAccordions() {
    const [expanded, setExpanded] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    
    const [userName, setUserName] = useState("");
    const [userLastName, setUserLastName] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const [avatarUrl, setAvatarUrl] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [isImageUploaded, setIsImageUploaded] = useState(false);
    const [orders, setOrders] = useState([]);
    const [favs, setFavs] = useState([]);

    const API_URL = process.env.REACT_APP_API_URL;
    
    useEffect(() => {
        const storedName = localStorage.getItem("userFirstName");
        if (storedName) {
            setUserName(storedName);
        }
    }, []);

    useEffect(() => {
        const storedLastName = localStorage.getItem("userLastName");
        if (storedLastName) {
            setUserLastName(storedLastName);
        }
    }, []);
        
    useEffect(() => {
        const storedAvatar = localStorage.getItem("avatarUrl");
        if (storedAvatar) {
            setAvatarUrl(`${API_URL}${storedAvatar}`);
        }
    }, [API_URL]);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];

        if (file) {
            if (file.size > 2 * 1024 * 1024) { // File size limit 2MB
                alert("File size must be less than 2MB");
                return;
            }

            setSelectedImage(file); // Store the selected file in state
            setPreviewImage(URL.createObjectURL(file));
            setIsImageUploaded(true);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result); // Set the preview image
            };
            reader.readAsDataURL(file);
        }
    };

        const handleCancelUpload = () => {
        setSelectedImage(null); 
        setPreviewImage(null); 
        setIsImageUploaded(false); 
    };

    const handleUploadAvatar = async () => {
    if (!selectedImage) return;

    const formData = new FormData();
    formData.append("avatar", selectedImage);

    try {
        const response = await fetch(`${API_URL}/api/auth/upload-avatar`, {
            method: "POST",
            body: formData,
            credentials: "include",
        });

        const data = await response.json();
        if (response.ok) {
            console.log("Avatar uploaded:", data.avatarUrl);
            localStorage.setItem("avatarUrl", data.avatarUrl);  // ✅ Зберігаємо в localStorage
            setPreviewImage(data.avatarUrl);  // Оновлюємо прев’ю
        } else {
            console.error("Error uploading avatar:", data.message);
        }
    } catch (error) {
        console.error("Request failed:", error);
    }
};

    const handleSubmit = async () => {
        await handleUploadAvatar();
        setLoading(true);
        const rawData = {
            firstName: userName,
            lastName: userLastName,
            gender: document.querySelector('input[name="radio-buttons-group"]:checked')?.value || "",
            dateOfBirth: document.getElementById("date-of-birth")?.value || "",
            country: document.getElementById("country")?.value || "",
            city: document.getElementById("city")?.value || "",
        };

        // Видаляємо всі поля, які мають порожнє значення
        const formData = Object.fromEntries(
            Object.entries(rawData).filter(([_, value]) => value.trim() !== "")
        );

        console.log("Filtered formData:", formData);

        try {
            const response = await fetch(`${API_URL}/api/auth/update`, {
                method: "PATCH",
                headers: { 
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
                credentials: "include",
            });

            const data = await response.json();
            console.log("Відповідь сервера:", data);
            if (response.ok) {
                localStorage.removeItem("userFirstName");
                localStorage.setItem("userFirstName", data.user.value.firstName);
                // Оновлюємо localStorage тільки якщо відповідні дані були оновлені
                if (data.user.value.firstName) {
                    localStorage.setItem("userFirstName", data.user.value.firstName);
                    setUserName(data.user.value.firstName);
                }
                if (data.user.value.lastName) {
                    localStorage.setItem("userLastName", data.user.value.lastName);
                    setUserLastName(data.user.value.lastName);
                }
                alert("Дані успішно оновлено!");
                window.location.reload();
            } else {
                console.error("Error updating user:", data.message);
            }
        } catch (error) {
            console.error("Request failed:", error);
        } finally {
      setLoading(false);
    }
    };

    const userId = localStorage.getItem("userId") || "";

     // Функція для отримання замовлень користувача
        const fetchOrders = useCallback(async () => {
        if (!userId) {
            console.error("User ID is missing!");
            return;
        }
        try {
            const response = await fetch(`${API_URL}/api/orders/${userId}`);
            const data = await response.json();
            if (response.ok) {
            setOrders(data);
            } else {
            console.error("Error fetching orders:", data.message);
            }
        } catch (error) {
            console.error("Request failed:", error);
        }
        }, [API_URL,userId]);

        useEffect(() => {
        fetchOrders();
        }, [fetchOrders]);

  // Викликаємо fetchOrders при завантаженні компонента
    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]); // Залежність userId, щоб виконати запит лише після його отримання

  const deleteOrder = async (orderId) => {
    if (!orderId) return;

    try {
        const response = await fetch(`${API_URL}/api/orders/${orderId}`, {
            method: "DELETE",
            credentials: "include",
        });

        if (response.ok) {
            setOrders((prevOrders) => prevOrders.filter(order => order._id !== orderId));
            console.log("Order deleted successfully");
        } else {
            console.error("Error deleting order");
        }
    } catch (error) {
        console.error("Request failed:", error);
    }
  };
    
    const fetchFavs = useCallback(async () => {
        if (!userId) return;
        try {
            const response = await fetch(`${API_URL}/api/favorites/${userId}`);
            const data = await response.json();
            if (response.ok) {
                setFavs(data);                
            } else {
            console.error("Error fetching favorites:", data.message);
            }
        } catch (error) {
            console.error("Request failed:", error);
        }
        }, [API_URL, userId]);

    useEffect(() => {
    fetchFavs();
    }, [fetchFavs]);
    
    const deleteFav = async (favId) => {
    if (!favId) return;
    console.log(favId);
    try {
        const response = await fetch(`${API_URL}/api/favorites/${favId}`, {
            method: "DELETE",
            credentials: "include",
        });

        if (response.ok) {
            setFavs((prevFavs) => prevFavs.filter(fav => fav._id !== favId));
            console.log("Favorite deleted successfully");
        } else {
            console.error("Error deleting favorite item");
        }
    } catch (error) {
        console.error("Request failed:", error);
    }
  };


    return (
        <div>
            <div>
                <Typography sx={{ width: '33%', flexShrink: 0, marginBottom: '25px', marginTop: '25px', justifySelf: 'right' }}>
                    Welcome, {userName}!
                </Typography> 
            </div>
            <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel4bh-content"
                    id="panel4bh-header"
                >
                    <Typography component="span" sx={{ width: '33%', flexShrink: 0 }}>
                        Personal data
                    </Typography>
                    <Typography component="span" sx={{ color: 'text.secondary' }}>
                        You can change your data and add new ones.
                    </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ placeItems: 'center' }}>
                    <Box
                        component="form"
                        sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
                        noValidate
                        autoComplete="off"
                    >
                        {loading ? (
                            <Stack spacing={1}>
                                <Skeleton variant="rectangular" width={210} height={40} />
                                <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                                <Skeleton variant="rectangular" width={210} height={40} />
                                <Skeleton variant="rectangular" width={210} height={40} />
                                <Skeleton variant="rectangular" width={210} height={40} />
                                <Skeleton variant="rectangular" width={210} height={40} />
                            </Stack>
                        ) : (
                            <div>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '16px' }}>
                                    <Avatar
                                        src={previewImage || avatarUrl}
                                        sx={{ width: 80, height: 80, marginBottom: 2 }}
                                    />
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '12px' }}>
                                        <Button variant="contained" color="error" onClick={handleCancelUpload} disabled={!isImageUploaded}>
                                            Cancel Upload
                                        </Button>
                                        <Button variant="contained" component="label">
                                            Upload Photo
                                            <Input type="file" sx={{ display: 'none' }} onChange={handleImageUpload} />
                                        </Button>
                                    </Box>
                                </Box>
                                <TextField
                                    id="standard-helperText"
                                    label={userName}
                                    helperText="Here you can change current name"
                                    variant="standard"
                                    onChange={(e) => setUserName(e.target.value)}
                                />
                                <TextField
                                    id="standard-helperText"
                                    label={userLastName}
                                    helperText="Here you can change second name"
                                    variant="standard"
                                    onChange={(e) => setUserLastName(e.target.value)}
                                />
                                <Box sx={{ margin: '8px' }}>
                                    <FormControl>
                                        <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                                        <RadioGroup
                                            aria-labelledby="demo-radio-buttons-group-label"
                                            defaultValue="female"
                                            name="radio-buttons-group"
                                            sx={{ flexDirection: 'row' }}
                                        >
                                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                                            <FormControlLabel value="other" control={<Radio />} label="Other" />
                                        </RadioGroup>
                                    </FormControl>
                                </Box>
                                <TextField
                                    id="date-of-birth"
                                    label="Date of Birth"
                                    type="date"
                                    variant="standard"
                                    InputLabelProps={{
                                        shrink: true, // Keep the label above the input field
                                    }}
                                    helperText="Select or change your date of birth"
                                />
                                <Box>
                                    <TextField
                                        id="country"
                                        label="Country"
                                        helperText="Select or change country"
                                        variant="standard"
                                    />
                                    <TextField
                                        id="city"
                                        label="City"
                                        helperText="Select or change city"
                                        variant="standard"
                                    />
                                </Box>
                            </div>)}
                                
                        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                            <Button variant="contained" color="primary" onClick={handleSubmit}>
                                {loading ? 'Sending...' : 'Submit'}
                            </Button>
                        </Box>
                    </Box>
                </AccordionDetails>
            </Accordion>
        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography component="span" sx={{ width: '33%', flexShrink: 0 }}>
            Favorites
          </Typography>
          <Typography component="span" sx={{ color: 'text.secondary' }}>
            Your favorites items will appear here
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
    {favs.length > 0 ? (
        <div>
            {favs.map((fav) => (
                <div key={fav._id} style={{ marginBottom: '16px', borderBottom: '1px solid #ccc', paddingBottom: '8px', display:'flex',justifyContent: 'space-between' }}>
                    <div>
                        <Typography variant="h6">Your order: {fav.bouquetTitle}</Typography>
                        <Typography>Total: {fav.bouquetPrice}UAH</Typography>
                        <Typography>Date: {new Date(fav.favedAt).toLocaleDateString()}</Typography>
                    </div>
                    <div style={{display: 'contents'}}>
                        <div>
                            <img src={fav.bouquetImg} alt={fav.title} width="100" length="100" />
                        </div>
                        <div>
                            <Button variant="contained" color="error" onClick={() => deleteFav(fav._id)}>
                                Delete favorite
                            </Button>
                        </div>
                    </div>
                    
                </div>
            ))}
        </div>
    ) : (
        <Typography>You have no favorite items yet.</Typography>
    )}
</AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
                    id="panel2bh-header"
                    onClick={fetchOrders}
        >
          <Typography component="span" sx={{ width: '33%', flexShrink: 0 }}>
            Orders
          </Typography>
          <Typography component="span" sx={{ color: 'text.secondary' }}>
            Your orders will appear here
          </Typography>
        </AccordionSummary>
<AccordionDetails>
    {orders.length > 0 ? (
        <div>
            {orders.map((order) => (
                <div key={order._id} style={{ marginBottom: '16px', borderBottom: '1px solid #ccc', paddingBottom: '8px', display:'flex',justifyContent: 'space-between' }}>
                    <div>
                        <Typography variant="h6">Your order: {order.bouquetTite}</Typography>
                        <Typography>Total: {order.bouquetPrice}UAH</Typography>
                        <Typography>Date: {new Date(order.orderedAt).toLocaleDateString()}</Typography>
                    </div>
                    <div style={{display: 'contents'}}>
                        <div>
                            <img src={order.bouquetImg} alt={order.title} width="100" length="100" />
                        </div>
                        <div>
                            <Button variant="contained" color="error" onClick={() => deleteOrder(order._id)}>
                                Delete Order
                            </Button>
                        </div>
                    </div>
                    
                </div>
            ))}
        </div>
    ) : (
        <Typography>You have no orders yet.</Typography>
    )}
</AccordionDetails>

      </Accordion>
    </div>
  );
}
