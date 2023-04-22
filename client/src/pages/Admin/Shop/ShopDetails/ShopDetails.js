import { Box, Button, CircularProgress, Grid, TextField } from '@mui/material';
import { green } from '@mui/material/colors';
import { Form, Formik } from 'formik';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useUpdateShopLocationMutation, useGetShopLocationQuery } from '../../../../feature/services/ecom/shopLocation.services';
import { shopSchema } from '../../../../schemas/ecom/shop.schema';
import styles from './ShopDetails.module.css';
import { useParams } from 'react-router-dom';
import { Alert, LinearProgress, Snackbar } from '@mui/material';

export default function ShopDetails() {
    const { id } = useParams();
    const [updateShop] = useUpdateShopLocationMutation();
    const history = useHistory();
    const [success, setSuccess] = React.useState(false);
    const { data: shop, isLoading, error } = useGetShopLocationQuery(id);

    const handleSubmit = async (values) => {
        const payload = { ...values }
        updateShop({ id, payload }).unwrap().then(() => {
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
            {/* Loading */}
            {isLoading && <LinearProgress color="primary" />}
            {/* Error Handling */}
            {error && <Snackbar open={true} autoHideDuration={6000}>
                <Alert severity="error">
                    {error.message ? error.message : "Something went wrong! Please try again later."}
                </Alert>
            </Snackbar>}
            {/* Success */}
            {success && <Snackbar open={true} autoHideDuration={6000}>
                <Alert severity="success">
                    User updated successfully!
                </Alert>
            </Snackbar>}
            {/* Content */}
            {!isLoading && shop && (
                <Formik
                    initialValues={{
                        name: shop?.shopLocation?.name || "",
                        longitude: shop?.shopLocation?.longitude || "",
                        latitude: shop?.shopLocation?.latitude || ""
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
                                helperText={touched.name && errors.name}
                            />
                            <TextField

                                label="Longitude"
                                variant="standard"
                                name="longitude"
                                value={values.longitude}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.longitude && Boolean(errors.longitude)}
                                helperText={touched.longitude && errors.longitude}
                            />
                            <TextField

                                label="Latitude"
                                variant="standard"
                                name="latitude"
                                value={values.latitude}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.latitude && Boolean(errors.latitude)}

                                helperText={touched.latitude && errors.latitude}
                            />
                            <Box sx={{ m: 1, position: 'relative' }}>
                                <Button
                                    variant="contained"
                                    sx={buttonSx}
                                    disabled={isSubmitting}
                                    type="submit"
                                    fullWidth
                                >
                                    Save
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
            )}
        </>
    )
}