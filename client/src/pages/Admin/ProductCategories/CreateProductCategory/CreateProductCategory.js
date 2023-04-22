import ImageIcon from '@mui/icons-material/Image';
import { Box, Button, CircularProgress, TextField, InputLabel } from '@mui/material';
import { green } from '@mui/material/colors';
import { Form, Formik } from 'formik';
import React from 'react';
import Dropzone from 'react-dropzone';
import { useHistory } from 'react-router-dom';
import { useCreateProductCategoryMutation } from '../../../../feature/services/ecom/productCategory.services';
import { productCategorySchema } from '../../../../schemas/ecom/productCategory.schema';
import styles from './CreateProductCategory.module.css';

export default function CreateProductCategory() {
    const [createProductCategory, {data, isLoading, error }] = useCreateProductCategoryMutation();
    const history = useHistory();
    const [success, setSuccess] = React.useState(false);

    const handleSubmit = async (values) => {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("description", values.description);
        formData.append("image", values.image);       
         
        createProductCategory(formData).unwrap().then(() => {
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
            <Formik
                initialValues={{
                    name: "Others",
                    description: "Just another product category",
                    image: null
                }}
                // validationSchema={productCategorySchema}
                onSubmit={handleSubmit}
            >
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, setFieldValue }) => (
                    <Form className={styles.form} onSubmit={handleSubmit}>
                        <TextField
                            id="name"
                            name="name"
                            label="Name"
                            variant="standard"
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.name && Boolean(errors.name)}
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