import * as React from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Alert,
  Snackbar,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const API_URL = process.env.REACT_APP_API_URL;

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90%', sm: 400 },
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

export default function CallRequestModal({ open, handleClose }) {
  const [name, setName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
    
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(false);
    setSuccess(false);

    const token = localStorage.getItem('token'); 
    
    if (!token) {
        setError('Потрібно залогінитись для замовлення дзвінка.');
        setIsLoading(false);
        return;
    }
    
    const numericPhone = parseInt(phone.replace(/\D/g, ''), 10);
    
    if (!name || isNaN(numericPhone)) {
        setError('Будь ласка, введіть коректне ім\'я та телефон.');
        setIsLoading(false);
        return;
    }

    try {
        const response = await fetch(`${API_URL}/contacts`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, 
            },
            body: JSON.stringify({ 
                name: name,
                phone: numericPhone, 
            }),
        });

        if (response.status === 401) {
             throw new Error('Не авторизовано. Будь ласка, залогіньтесь.');
        }

        if (!response.ok) {
            const errData = await response.json();
            throw new Error(errData.message || 'Помилка відправки запиту на сервер.');
        }
        
        setSuccess(true);
        setName('');
        setPhone('');
        setTimeout(handleClose, 2000); 

    } catch (err) {
        console.error('API Error:', err.message);
        setError(err.message);
    } finally {
        setIsLoading(false);
    }
  };
    
  return (
    <>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style} component="form" onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <IconButton onClick={handleClose} size="small" sx={{ position: 'absolute', top: 8, right: 8 }}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Typography id="modal-modal-title" variant="h6" component="h2" gutterBottom>
            Замовити зворотний дзвінок
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1, mb: 3 }}>
            Залиште свої контакти, і ми обов'язково вам зателефонуємо.
          </Typography>

          <TextField
            required
            label="Ваше ім'я"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            required
            label="Номер телефону"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
            type="tel"
          />

                  <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      sx={{ mt: 3, backgroundColor: 'orange', '&:hover': { backgroundColor: '#e69500' } }}>
                        {isLoading ? 'Надсилання...' : 'Зателефонуйте мені'}
                    </Button>
        </Box>
      </Modal>

      {/* Повідомлення про успіх/помилку */}
      <Snackbar open={success} autoHideDuration={4000} onClose={() => setSuccess(false)}>
        <Alert onClose={() => setSuccess(false)} severity="success" sx={{ width: '100%' }}>
          Запит відправлено! Ми зв'яжемося з вами.
        </Alert>
      </Snackbar>
      <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(false)}>
        <Alert onClose={() => setError(false)} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </>
  );
}