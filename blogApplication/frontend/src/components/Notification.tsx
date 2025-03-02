import React from 'react';
import { useSelector } from 'react-redux';
import { Alert } from '@mui/material';

const Notification = () => {
  const { notification, type } = useSelector((state:any) => state.notification);

  if (!notification) return null;

  return (
    <Alert severity={type}>
      {notification}
    </Alert>
  );
};



export default Notification;
