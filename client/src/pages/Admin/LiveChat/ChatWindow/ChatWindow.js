import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import UserInput from '../UserInput/UserInput';
import MessageList from '../MessageList/MessageList';
import styles from './ChatWindow.module.css';

function ChatWindow(props) {
  const [message, setMessage] = useState('');

  function handleMessageSend(value) {
    if (value !== '') {
      props.onMessageSend(value);
      setMessage('');
    }
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleMessageSend(event.target.value);
    }
  }

  return (
    <div className={styles.chatWindow}>
      <AppBar position="static" className={styles.chatHeader}>
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            className={styles.backButton}
            onClick={props.onBackButtonClick}
          >
            <ArrowBack />
          </IconButton>
          <Typography variant="h6" className={styles.chatTitle}>
            {props.chatName}
          </Typography>
          {/* Mark as Done Button */}
          <Button 
            variant="contained"
            className={styles.markAsDoneButton}
            onClick={props.onMarkAsDoneClick}
            sx={{ marginLeft: 'auto' }}
          >
            Mark as Done
          </Button>

        </Toolbar>
      </AppBar>
      <div className={styles.messageList}>
        <MessageList messages={props.messages} />
      </div>
      <UserInput
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onSend={handleMessageSend}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}

export default ChatWindow;
