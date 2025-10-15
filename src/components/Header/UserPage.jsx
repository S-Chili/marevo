import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "./AuthForm";
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
    const { user, login, isAuthenticated, isAuthReady } = useAuth();
    const [expanded, setExpanded] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
        
    const [userName, setUserName] = useState("");
    const [userLastName, setUserLastName] = useState("");
    const [gender, setGender] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");

    const [selectedImage, setSelectedImage] = useState(null);
    const [avatarUrl, setAvatarUrl] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [isImageUploaded, setIsImageUploaded] = useState(false);
    const [orders, setOrders] = useState([]);
    const [favs, setFavs] = useState([]);

    const API_URL = process.env.REACT_APP_API_URL;
    
    useEffect(() => {
        if (user) {
            setUserName(user.firstName || ""); 
            setUserLastName(user.lastName || "");
            setGender(user.gender || "female");
            setDateOfBirth(user.dateOfBirth || "");
            setCountry(user.country || "");
            setCity(user.city || "");
            if (user.avatarUrl) {
                setAvatarUrl(`${API_URL}${user.avatarUrl}`); 
            }
        }
    }, [user, API_URL]);  

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];

        if (file) {
            if (file.size > 2 * 1024 * 1024) { 
                alert("File size must be less than 2MB");
                return;
            }

            setSelectedImage(file);
            setPreviewImage(URL.createObjectURL(file)); 
            setIsImageUploaded(true);
        }
    };

    const handleCancelUpload = () => {
        setSelectedImage(null); 
        setPreviewImage(null); 
        setIsImageUploaded(false); 
        if (user && user.avatarUrl) {
             setPreviewImage(`${API_URL}${user.avatarUrl}`); 
        } else {
             setPreviewImage(null);
        }
    };

        
    const userId = user?._id;

    const handleUploadAvatar = async () => {
        if (!selectedImage || !user || !user._id) return;

        const formData = new FormData();
        formData.append("avatar", selectedImage);

        try {
            const response = await fetch(`${API_URL}/api/auth/upload-avatar/`, { 
                method: "POST",
                body: formData,
                credentials: "include",
            });

            const data = await response.json();
            if (response.ok) {
                console.log("Avatar uploaded:", data.avatarUrl);
                const updatedUser = { ...user, avatarUrl: data.avatarUrl };
                login(null, updatedUser); 

                setAvatarUrl(`${API_URL}${data.avatarUrl}`);
                setPreviewImage(null);
                setSelectedImage(null);
                setIsImageUploaded(false);

                return data.avatarUrl;
            } else {
                console.error("Error uploading avatar:", data.message);
                return null;
            }
        } catch (error) {
            console.error("Request failed:", error);
            return null;
        }
    };

    const handleSubmit = async () => {
        if (!isAuthenticated) {
             alert("Користувач не авторизований.");
             return;
        }

        setLoading(true);
        const newAvatarUrl = selectedImage ? await handleUploadAvatar() : null; 

        const formData = {};
        
        if (userName && userName !== user.firstName) {
        formData.firstName = userName;
    }
    
    if (userLastName && userLastName !== user.lastName) {
        formData.lastName = userLastName;
    }

    if (gender && gender !== user.gender) {
        formData.gender = gender;
    }

    if (dateOfBirth && dateOfBirth !== user.dateOfBirth) {
        formData.dateOfBirth = dateOfBirth;
    }

    if (country && country !== user.country) {
        formData.country = country;
    }

    if (city && city !== user.city) {
        formData.city = city;
    }

    if (newAvatarUrl) {
        formData.avatarUrl = newAvatarUrl;
    }

    if (Object.keys(formData).length === 0) {
        alert("Немає даних для оновлення.");
        setLoading(false);
        return;
    }

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

         if (!response.ok) {
            const errorData = await response.json();
            console.error("Error updating user:", errorData.message);
            alert("Error: " + errorData.message); 
        } else {
            const data = await response.json();
            console.log("Response from server:", data);
            alert("Дані успішно оновлено!");

            login(data.user);
        }
    } catch (error) {
        console.error("Request failed:", error);
    } finally {
        setLoading(false);
    }
};

    const fetchOrders = useCallback(async () => {
        if (!userId) {
            setOrders([]); 
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
    }, [API_URL, userId]);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

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
        if (!userId) {
             setFavs([]); 
             return;
        }
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
        !isAuthReady ? null :
        <div>
            <Typography sx={{ width: '33%', flexShrink: 0, marginBottom: '25px', marginTop: '25px', justifySelf: 'right' }}>
                Welcome, {userName || (user ? user.email : "Guest")}!
            </Typography>
            <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel4bh-content" id="panel4bh-header">
                    <Typography component="span" sx={{ width: '33%', flexShrink: 0 }}>Personal data</Typography>
                    <Typography component="span" sx={{ color: 'text.secondary' }}>You can change your data and add new ones.</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ placeItems: 'center' }}>
                    <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }} noValidate autoComplete="off">
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
                                    <Avatar src={previewImage || avatarUrl} sx={{ width: 80, height: 80, marginBottom: 2 }} />
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '12px' }}>
                                        <Button variant="contained" color="error" onClick={handleCancelUpload} disabled={!isImageUploaded}>Cancel Upload</Button>
                                        <Button variant="contained" component="label">
                                            Upload Photo
                                            <Input type="file" sx={{ display: 'none' }} onChange={handleImageUpload} />
                                        </Button>
                                    </Box>
                                </Box>
                                <TextField
                                    id="standard-helperText"
                                    label={user ? user.firstName || "First Name" : "First Name"}
                                    value={userName}
                                    helperText="Here you can change current name"
                                    variant="standard"
                                    onChange={(e) => setUserName(e.target.value)}
                                />
                                <TextField
                                    id="standard-helperText"
                                    label={user ? user.lastName || "Last Name" : "Last Name"}
                                    value={userLastName}
                                    helperText="Here you can change second name"
                                    variant="standard"
                                    onChange={(e) => setUserLastName(e.target.value)}
                                />
                                <Box sx={{ margin: '8px' }}>
                                    <FormControl>
                                        <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                                        <RadioGroup
                                            aria-labelledby="demo-radio-buttons-group-label"
                                            value={gender} // ✅ Використовуємо value
                                            onChange={(e) => setGender(e.target.value)} // ✅ Додаємо onChange
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
                                    value={dateOfBirth} // ✅ Використовуємо value
                                    onChange={(e) => setDateOfBirth(e.target.value)} // ✅ Додаємо onChange
                                    variant="standard"
                                    InputLabelProps={{ shrink: true }}
                                    helperText="Select or change your date of birth"
                                />
                                <Box>
                                    <TextField
                                        id="country"
                                        label="Country"
                                        value={country} // ✅ Використовуємо value
                                        onChange={(e) => setCountry(e.target.value)} // ✅ Додаємо onChange
                                        helperText="Select or change country"
                                        variant="standard"
                                    />
                                    <TextField
                                        id="city"
                                        label="City"
                                        value={city} // ✅ Використовуємо value
                                        onChange={(e) => setCity(e.target.value)} // ✅ Додаємо onChange
                                        helperText="Select or change city"
                                        variant="standard"
                                    />
                                </Box>
                            </div>
                        )}
                        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                            <Button variant="contained" color="primary" onClick={handleSubmit}>
                                {loading ? 'Sending...' : 'Submit'}
                            </Button>
                        </Box>
                    </Box>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
                    <Typography component="span" sx={{ width: '33%', flexShrink: 0 }}>Favorites</Typography>
                    <Typography component="span" sx={{ color: 'text.secondary' }}>Your favorites items will appear here</Typography>
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
                                            <Button variant="contained" color="error" onClick={() => deleteFav(fav._id)}>Delete favorite</Button>
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
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2bh-content" id="panel2bh-header">
                    <Typography component="span" sx={{ width: '33%', flexShrink: 0 }}>Orders</Typography>
                    <Typography component="span" sx={{ color: 'text.secondary' }}>Your orders will appear here</Typography>
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
                                            <Button variant="contained" color="error" onClick={() => deleteOrder(order._id)}>Delete Order</Button>
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
