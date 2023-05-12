import React, { useState } from 'react';
import styles from './UserInput.module.css';
import { TextField, Button, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

function UserInput(props) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      props.onSend(message.trim());
      setMessage('');
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <TextField
        className={styles.input}
        variant="outlined"
        label="Type your message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <IconButton
        className={styles.sendButton}
        type="submit"
        color="primary"
        aria-label="send message"
      >
        <SendIcon />
      </IconButton>
    </form>
  );
}

export default UserInput;
