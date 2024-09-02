import  { useState } from 'react';
import {
  Button,
  Modal,
  Box,
  Typography,
  TextField,
  Grid,
  Paper,
} from '@mui/material';

const PayButton = () => {
  const [open, setOpen] = useState(false);
  const [payment, setPayment] = useState('');
  const [tax, setTax] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handlePaymentChange = (e) => {
    setPayment(e.target.value);
  };

  const handleTaxChange = (e) => {
    setTax(e.target.value);
  };

  const handleSubmit = () => {
    // Handle the submission logic here
    console.log(`Payment: ${payment}, Tax: ${tax}`);
    handleClose();
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Pay
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box
          component={Paper}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2" gutterBottom>
            Payment Details
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Payment"
                variant="outlined"
                value={payment}
                onChange={handlePaymentChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Tax"
                variant="outlined"
                value={tax}
                onChange={handleTaxChange}
              />
            </Grid>
          </Grid>
          <Box mt={3}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              fullWidth
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default PayButton;
