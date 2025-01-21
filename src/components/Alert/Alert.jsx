import React from 'react';
import { Snackbar, Alert as MuiAlert } from '@mui/material';

const Alert = ({
  open,
  onClose,
  message,
  type = 'success',
  position = { vertical: 'top', horizontal: 'center' }
}) => {
  const alertType = ['error', 'warning', 'info', 'success'].includes(type) ? type : 'success';

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={position}
    >
      <MuiAlert
        onClose={onClose}
        severity={alertType}
        sx={{ width: '100%' }}
        variant="filled"
      >
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

export default Alert;
