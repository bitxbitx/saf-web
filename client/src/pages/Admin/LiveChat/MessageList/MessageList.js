import React, { useRef, useEffect } from 'react';
import { List, ListItem, ListItemText } from '@mui/material';
import styles from './MessageList.module.css';
import { useMeQuery } from '../../../../feature/services/auth/auth.services';

function MessageList(props) {
  const messageListRef = useRef(null);
  const { data: meData } = useMeQuery();

  // Function to scroll to the bottom of the message list
  const scrollToBottom = () => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom(); // Scroll to bottom on component mount or when messages change
  }, [props.messages]);

  function formatDate(date) {
    const messageDate = new Date(date);
    // Check if the date is today
    if (messageDate.toDateString() === new Date().toDateString()) {
      return messageDate.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });
    } else {
      return messageDate.toLocaleDateString([], {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    }
  }

  return (
    <List ref={messageListRef} className={styles.messageList}>
      {props.messages?.map((message, index) => (
        <ListItem
          key={index}
          className={`${styles.messageItem} ${
            message.sender === meData?.user._id ? styles.sentMessage : styles.receivedMessage
          }`}
          sx={{
            display: 'flex',
            flexDirection: message.sender === meData?.user._id ? 'row-reverse' : 'row',
          }}
        >
          <div
            className={`${styles.chatBubble} ${
              message.sender === meData?.user._id ? styles.sentChatBubble : styles.receivedChatBubble
            }`}
          >
            <ListItemText primary={message.text} secondary={formatDate(message.createdAt)} />
          </div>
        </ListItem>
      ))}
    </List>
  );
}

export default MessageList;
