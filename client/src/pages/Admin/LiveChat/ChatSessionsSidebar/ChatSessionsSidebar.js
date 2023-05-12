import React from 'react';
import { List, ListItem, ListItemText, Badge } from '@mui/material';
import styles from './ChatSessionsSidebar.module.css';

function ChatSessionsSidebar(props) {
  function handleChatItemClick(chatId) {
    props.onChatItemClick(chatId);
  }

  function formatDate(date) {
    const today = new Date();
    const messageDate = new Date(date);
    if (today.toDateString() === messageDate.toDateString()) {
      return messageDate.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });
    } else if (today.getFullYear() === messageDate.getFullYear()) {
      return messageDate.toLocaleDateString([], {
        month: 'short',
        day: 'numeric',
      });
    } else {
      return messageDate.toLocaleDateString([], {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    }
  }

  function truncateText(text, length) {
    if (text.length > length) {
      return text.substring(0, length) + '...';
    } else {
      return text;
    }
  }

  return (
    <div className={styles.sidebar}>
      <List sx={{
        width: '100%',
        // maxWidth: 360,
        bgcolor: 'background.paper',
        height: '100%',
      }}>
        {props.chatSessions?.map((chatSession, index) => (
          <ListItem
            key={chatSession.id}
            className={
              props.activeChatId === chatSession.id
                ? styles.activeChatItem
                : ''
            }
            button
            onClick={() => handleChatItemClick(index)}
          >
            <div className={styles.chatSession}>
              <div className={styles.chatSessionHeader}>
                {/* Make the name ... when overflow */}
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '50%', whiteSpace: 'nowrap' }}
                >{chatSession.name}</span>
                
                <span>{chatSession.messages.length > 0 ? formatDate(chatSession.messages[0].createdAt) : ''}</span>


              </div>
              <div className={styles.chatSessionLastMessage}>
              <span>{truncateText(chatSession.messages.length > 0 ? chatSession.messages[chatSession.messages.length - 1].text : '', 30)}</span>

                <Badge
                  variant="standard"
                  color="primary"
                  badgeContent={chatSession.unreadMessageCount}
                  sx={{ ml: 1 }}
                />
              </div>
            </div>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default ChatSessionsSidebar;
