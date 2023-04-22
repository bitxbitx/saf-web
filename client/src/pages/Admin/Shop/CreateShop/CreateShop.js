import { Box, Button, CircularProgress, Grid, TextField } from '@mui/material';
import { green } from '@mui/material/colors';
import { Form, Formik } from 'formik';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useCreateShopLocationMutation } from '../../../../feature/services/ecom/shopLocation.services';
import { shopSchema } from '../../../../schemas/ecom/shop.schema';
import styles from './CreateShop.module.css';

export default function CreateShop() {
    const [createShop] = useCreateShopLocationMutation();
    const history = useHistory();
    const [success, setSuccess] = React.useState(false);

    const handleSubmit = async (values) => {
        const payload = { ...values }
        createShop(payload).unwrap().then(() => {
            setSuccess(true);
            setTimeout(() => {
                history.push("/admin/shop");
            }, 1000);
        });
    }

    const buttonSx = {
        ...(success && {
            bgcolor: green[500],
            '&:hover': {
                bgcolor: green[700],
            },
        }),
    };

    return (
        <>
            <Formik
                initialValues={{
                    name: "TEST SHOP",
                    longitude: "33.333",
                    latitude: "44.444"
                }}
                validationSchema={shopSchema}
                onSubmit={handleSubmit}
            >
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                    <Form className={styles.form}>
                        <TextField
                            label="Name"
                            variant="standard"
                            name="name"
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.name && Boolean(errors.name)}
                        />
                        <TextField
                            label="Longitude"
                            variant="standard"
                            name="longitude"
                            value={values.longitude}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.longitude && Boolean(errors.longitude)}
                        />
                        <TextField
                            label="Latitude"
                            variant="standard"
                            name="latitude"
                            value={values.latitude}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.latitude && Boolean(errors.latitude)}
                        />
                        <Box sx={{ m: 1, position: 'relative' }}>
                            <Button
                                variant="contained"
                                sx={buttonSx}
                                disabled={isSubmitting}
                                type="submit"
                                fullWidth
                            >
                                Create
                            </Button>
                            {isSubmitting && (
                                <CircularProgress
                                    size={24}
                                    sx={{
                                        color: green[500],
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        marginTop: '-12px',
                                        marginLeft: '-12px',
                                    }}
                                />
                            )}
                        </Box>
                    </Form>
                )}
            </Formik>
        </>
    )
}