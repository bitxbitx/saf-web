import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './ContentTopBar.module.css';
import { Box } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export default function ContentTopBar({ title, redirectLink }) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const history = useHistory();

    const handleCreate = () => {
        history.push(redirectLink);
    }

    const handleGoBack = () => {
        history.goBack();
    }

    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <IconButton onClick={handleGoBack}>
                    <ArrowBackIcon />
                </IconButton>
                <Box sx={{ width: 10 }} />
                <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                    {title}
                </Typography>
            </div>
            <Button fullWidth={isMobile} variant="contained" size="small" startIcon={<AddIcon />} onClick={handleCreate}> Create </Button>

        </div>
    )
}