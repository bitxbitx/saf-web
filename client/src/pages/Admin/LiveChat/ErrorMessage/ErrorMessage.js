import React from 'react';
import styles from './ErrorMessage.module.css';
import { Alert } from '@mui/material';

function ErrorMessage(props) {

  return (
    <Alert className={styles.alert} severity="error">
      {props.message}
    </Alert>
  );
}

export default ErrorMessage;
