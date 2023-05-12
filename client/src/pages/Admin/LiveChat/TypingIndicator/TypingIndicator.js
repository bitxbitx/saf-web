import React from 'react';
import { Typography, CircularProgress } from '@mui/material';
import styles from './TypingIndicator.module.css';

function TypingIndicator(props) {
  return (
    <div className={styles.container}>
      <CircularProgress size={20} color="primary" />
      <Typography className={styles.text} variant="subtitle1" color="textSecondary">
        {props.typingMessage}
      </Typography>
    </div>
  );
}

export default TypingIndicator;
