/* eslint-disable react/prop-types */


import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export const ErrorAlert = ({ open, message, onClose }) => {
    return (
  
      <Snackbar open={open}      anchorOrigin={{ vertical: '', horizontal: 'center' }}  autoHideDuration={3000} onClose={onClose}       className="absolute top-[-230px] p-5 lg:p-0 lg-w-full left-0 "
>
        <Alert onClose={onClose}
      
        severity="error" sx={{ width: '100%' }} className=''>
          {message}
        </Alert>
      </Snackbar>
    );
  };