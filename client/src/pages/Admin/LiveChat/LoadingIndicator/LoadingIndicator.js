// LoadingIndicator.jsx
import React from 'react';
import { CircularProgress } from '@mui/material';
import styles from './LoadingIndicator.module.css';

function LoadingIndicator() {
  return (
    <div className={styles.container}>
      <CircularProgress color="primary" />
    </div>
  );
}

export default LoadingIndicator;
