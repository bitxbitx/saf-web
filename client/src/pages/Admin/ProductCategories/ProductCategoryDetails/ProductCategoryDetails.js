import ImageIcon from '@mui/icons-material/Image';
import { Alert, Box, Button, CircularProgress, InputLabel, LinearProgress, Snackbar, TextField } from '@mui/material';
import { green } from '@mui/material/colors';
import { Form, Formik } from 'formik';
import React from 'react';
import Dropzone from 'react-dropzone';
import { useHistory, useParams } from 'react-router-dom';
import { useGetProductCategoryQuery, useUpdateProductCategoryMutation } from '../../../../feature/services/ecom/productCategory.services';
import styles from './ProductCategoryDetails.module.css';


export default function ProductCategoryDetails() {
    const { id } = useParams();
    const [updateProductCategory] = useUpdateProductCategoryMutation();
    const history = useHistory();
    const [success, setSuccess] = React.useState(false);
    const { data: productCategory, isLoading, error } = useGetProductCategoryQuery(id);

    const handleSubmit = async (values) => {
        const data = { ...values };

        updateProductCategory( { id: id, ...data} ).unwrap().then(() => {
            setSuccess(true);
            setTimeout(() => {
                history.push("/admin/product-categories");
            }, 2000);
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
            {!isLoading && productCategory && (
                <Formik
                    initialValues={{
                        name: productCategory?.productCategory?.name || "",
                        description: productCategory?.productCategory?.description || "",
                        image: null
                    }}
                    // validationSchema={productCategorySchema}
                    onSubmit={handleSubmit}
                >
                    {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, setFieldValue }) => (
                        <Form className={styles.form}>
                            <TextField
                                id="name"
                                name="name"
                                label="Name"
                                variant="standard"
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.name && Boolean(errors.name)}
                                helperText={touched.name && errors.name}
                                className={styles.input}
                                fullWidth
                            />
                            <TextField

                                id="description"
                                name="description"
                                label="Description"
                                variant="standard"
                                value={values.description}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.description && Boolean(errors.description)}
                                helperText={touched.description && errors.description}
                                className={styles.input}
                                fullWidth
                            />
                            <InputLabel htmlFor="image" className={styles.input}>Image</InputLabel>
                            <Dropzone
                                multiple={false}
                                onDrop={(acceptedFiles) => {
                                    setFieldValue("image", acceptedFiles[0]);
                                }}
                            >
                                {({ getRootProps, getInputProps }) => (
                                    <Box

                                        {...getRootProps()}
                                        className={styles.dropzone}
                                    >
                                        <input {...getInputProps()} />
                                        {values.image ? (
                                            <img src={URL.createObjectURL(values.image)} alt="product category" className={styles.image} />
                                        ) : (
                                            <>
                                                <ImageIcon sx={{ fontSize: 100 }} />
                                                <p>Drag 'n' drop some files here, or click to select files</p>
                                            </>
                                        )}
                                    </Box>
                                )}
                            </Dropzone>
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