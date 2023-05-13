import React from 'react';
import { Avatar } from '@mui/material';
import styles from './Message.module.css';

function Message(props) {
  const { sentByMe, avatarUrl, senderName, text } = props;

  return (
    <div className={`${styles.message} ${sentByMe ? styles.sentMessage : ''}`}>
      <Avatar src={avatarUrl} alt={senderName} />
      <div className="message-content">
        <div className="message-header">{senderName}</div>
        <div className="message-body">{text}</div>
      </div>
    </div>
  );
}

export default Message;
