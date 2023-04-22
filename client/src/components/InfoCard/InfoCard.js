import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import React from 'react';
import styles from './InfoCard.module.css';
import { Avatar } from '@mui/material';

export default function InfoCard({ title, properties, image, editFunc, deleteFunc }) {
  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name) {
    const initials = name
      .split(/\s+/) // Split by any number of whitespace characters
      .map((word) => word[0])
      .join('')
      .toUpperCase();
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: initials,
    };
  }
  
  return (
    <div className={styles.container}>
      <div className={styles.image}>
        {image && image !=="null" ? <img src={'http://localhost:8000/'+ image} alt={title} /> : <Avatar {...stringAvatar(title)} />}
      </div>
      <div className={styles.content}>
        <Typography variant="h6" component="div" > {title} </Typography>
        {properties && Object.entries(properties).map(([key, value]) => {
          return (
            <Typography
              variant="body1"
              component="div"
              key={key}
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {key}: {value}
            </Typography>
          )
        })}
      </div>
      <div className={styles.actions}>
        <Button variant="contained" size="small" onClick={editFunc} startIcon={<EditIcon />}> Edit </Button>
        <Box sx={{ width: 10 }} />
        <Button variant="contained" size="small" onClick={deleteFunc} startIcon={<DeleteIcon />} color='error'> Delete </Button>
      </div>
    </div>
  )
}