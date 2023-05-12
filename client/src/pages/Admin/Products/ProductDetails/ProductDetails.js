import ImageIcon from '@mui/icons-material/Image';
import { Alert, Box, Button, Checkbox, CircularProgress, FormControl, LinearProgress, Snackbar, TextField, Typography } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { green } from '@mui/material/colors';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import Dropzone from 'react-dropzone';
import { useParams } from 'react-router-dom';
import { useGetProductQuery, useUpdateProductMutation } from '../../../../feature/services/ecom/product.services';
import { useGetProductCategoriesQuery } from '../../../../feature/services/ecom/productCategory.services';
import { useCreateProductVariantMutation, useUpdateProductVariantMutation } from '../../../../feature/services/ecom/productVariant.services';
import styles from './ProductDetails.module.css';
import { MenuItem, Select, InputLabel } from '@mui/material';
import { useHistory } from 'react-router-dom';

export default function ProductDetails() {
    const { data: productCategories, isLoading, error } = useGetProductCategoriesQuery();
    const [success, setSuccess] = React.useState(false);
    const [attributes, setAttributes] = React.useState([]);
    const { id } = useParams();
    const [updateProduct] = useUpdateProductMutation();
    const [updateProductVariant] = useUpdateProductVariantMutation();
    const [createProductVariant] = useCreateProductVariantMutation();
    const { data: product, isLoading: isProductLoading } = useGetProductQuery(id);
    const history = useHistory();


    const handleSubmit = async (values) => {
        try {
            const { variants, ...rest } = values;
            // change attributes from array to a json object
            const newAttributes = {};
            attributes.forEach((attribute) => {
                newAttributes[attribute.name] = attribute.value;
            });
            updateProduct({ id, attributes: newAttributes, ...rest }).unwrap().then((res) => {
                const { _id } = res.product;
                variants.forEach(async (variant) => {
                    console.log("variant", variant)
                    if (variant._id) {
                        await updateProductVariant({ id: variant._id, ...variant }).unwrap();
                    } else {
                        await createProductVariant({ product: _id, ...variant }).unwrap();
                    }
                });

                setSuccess(true);
                history.push("/admin/products");
            })
        }
        catch (error) {
            console.log("error", error)
        }
    }

    const buttonSx = {
        ...(success && {
            bgcolor: green[500],
            '&:hover': {
                bgcolor: green[700],
            },
        }),
    };

    console.log("product", product)
    return (
        <>
            {/* Loading */}
            {isLoading && isProductLoading && <LinearProgress color="primary" />}
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
            {!isLoading && productCategories.productCategories && !isProductLoading && (
                <Formik
                    initialValues={{
                        name: product?.product?.name || "",
                        description: product?.product?.description || "",
                        image: null,
                        stock: product?.product?.stock || 0,
                        price: product?.product?.price || 0,
                        status: product?.product?.status || "active",
                        sku: product?.product?.sku || "",
                        productCategory: product?.product?.productCategory || [],
                        // productDetail: product?.product?.productDetail || "",
                        variants: product?.product?.productVariant || [],
                    }}
                    // validationSchema={productSchema}
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
                            />
                            {/* <TextField
                            id="productDetail"
                            name="productDetail"
                            label="Product Detail"
                            variant="standard"
                            value={values.productDetail}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.productDetail && Boolean(errors.productDetail)}
                            className={styles.input}
                        /> */}
                            <TextField
                                id="stock"
                                name="stock"
                                label="Stock (Optional)"
                                variant="standard"
                                value={values.stock}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.stock && Boolean(errors.stock)}
                                className={styles.input}
                            />
                            <TextField
                                id="price"
                                name="price"
                                label="Price (Optional)"
                                variant="standard"
                                value={values.price}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.price && Boolean(errors.price)}
                                className={styles.input}
                            />
                            <TextField
                                id="sku"
                                name="sku"
                                label="SKU (Optional)"
                                variant="standard"
                                value={values.sku}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.sku && Boolean(errors.sku)}
                                className={styles.input}
                            />
                            <FormControl variant="standard" sx={{ m: 0, minWidth: 120 }} className={styles.productStatus}>
                                <InputLabel id="status">Status</InputLabel>
                                <Select
                                    labelId="status"
                                    id="status"
                                    name="status"
                                    value={values.status}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.status && Boolean(errors.status)}
                                    label="Status"
                                >
                                    <MenuItem value="active">Active</MenuItem>
                                    <MenuItem value="inactive">Inactive</MenuItem>
                                    <MenuItem value="archived">Archived</MenuItem>
                                </Select>
                            </FormControl>

                            <FormLabel>Product Category</FormLabel>
                            <FormControl variant="standard" sx={{ m: 0, minWidth: 120 }} className={styles.productCategories}>
                                {productCategories?.productCategories?.map((option) => (
                                    <Field key={option._id} name="productCategory">
                                        {({ field }) => (
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        {...field}
                                                        checked={values.productCategory.some((category) => category._id === option._id)}
                                                        onChange={() => {
                                                            if (values.productCategory.some((category) => category._id === option._id)) {
                                                                const nextValue = values.productCategory.filter((category) => category._id !== option._id);
                                                                setFieldValue('productCategory', nextValue);
                                                            } else {
                                                                const nextValue = values.productCategory.concat({ _id: option._id });
                                                                setFieldValue('productCategory', nextValue);
                                                            }
                                                        }}
                                                    />

                                                }
                                                label={option.name}
                                            />
                                        )}
                                    </Field>
                                ))}
                            </FormControl>
                            <Dropzone
                                onDrop={(acceptedFiles) => {
                                    setFieldValue("image", acceptedFiles[0]);
                                }}
                            >
                                {({ getRootProps, getInputProps }) => (
                                    <Box {...getRootProps()} className={styles.dropzone}>
                                        <input {...getInputProps()} />
                                        {values.image ? (
                                            <img src={URL.createObjectURL(values.image)} alt="product" className={styles.image} />
                                        ) : (
                                            <>
                                                <ImageIcon sx={{ fontSize: 100 }} />
                                                <p>Drag 'n' drop some files here, or click to select files</p>
                                            </>
                                        )}

                                    </Box>
                                )}
                            </Dropzone>

                            <div>
                                <div className={styles.topbar}>
                                    <div>
                                        <Typography variant="h6">Attributes</Typography>
                                        <Typography variant="caption">Add attributes to your product in the format M|X|L</Typography>
                                    </div>
                                    <Button variant="contained" onClick={() => setAttributes([...attributes, { name: "", value: "" }])}>Add Attribute</Button>

                                </div>

                                {attributes.map((attribute, index) => (
                                    <div key={index} className={styles.attribute}>
                                        <TextField
                                            id="name"
                                            name="name"
                                            label="Name"
                                            variant="standard"
                                            value={attribute.name}
                                            onChange={(e) => {
                                                const newAttributes = [...attributes];
                                                newAttributes[index].name = e.target.value;
                                                setAttributes(newAttributes);
                                            }}
                                            className={styles.input}
                                        />
                                        <TextField

                                            id="value"
                                            name="value"
                                            label="Value"
                                            variant="standard"
                                            value={attribute.value}
                                            onChange={(e) => {
                                                const newAttributes = [...attributes];
                                                newAttributes[index].value = e.target.value;
                                                setAttributes(newAttributes);
                                            }}
                                            className={styles.input}
                                        />
                                        <Button variant="contained" color='error' onClick={() => {
                                            const newAttributes = [...attributes];
                                            newAttributes.splice(index, 1);
                                            setAttributes(newAttributes);
                                        }}>Remove</Button>

                                    </div>
                                ))}
                            </div>

                            <Button
                                variant="contained"
                                component="label"
                                className={styles.input}
                                onClick={() => {
                                    if (attributes.length === 0) {
                                        alert("Please add attributes first");
                                        return;
                                    }
                                    const attributeValues = attributes.map(attribute => attribute.value.split('|'));

                                    // Generate all combinations of attribute values
                                    const combinations = [];
                                    const numAttributes = attributes.length;

                                    for (let i = 0; i < attributeValues[0].length; i++) {
                                        const combination = {};
                                        combination[attributes[0].name] = attributeValues[0][i];

                                        if (numAttributes > 1) {
                                            // Generate combinations for remaining attributes
                                            const remainingAttributes = attributes.slice(1);
                                            const remainingAttributeValues = attributeValues.slice(1);
                                            const remainingCombinations = generateCombinations(remainingAttributes, remainingAttributeValues);

                                            // Merge combinations
                                            remainingCombinations.forEach(remainingCombination => {
                                                const mergedCombination = Object.assign({}, combination, remainingCombination);
                                                combinations.push(mergedCombination);
                                            });
                                        } else {
                                            combinations.push(combination);
                                        }
                                    }

                                    function generateCombinations(attributes, attributeValues) {
                                        const combinations = [];
                                        const numAttributes = attributes.length;

                                        for (let i = 0; i < attributeValues[0].length; i++) {
                                            const combination = {};
                                            combination[attributes[0].name] = attributeValues[0][i];

                                            if (numAttributes > 1) {
                                                // Generate combinations for remaining attributes
                                                const remainingAttributes = attributes.slice(1);
                                                const remainingAttributeValues = attributeValues.slice(1);
                                                const remainingCombinations = generateCombinations(remainingAttributes, remainingAttributeValues);

                                                // Merge combinations
                                                remainingCombinations.forEach(remainingCombination => {
                                                    const mergedCombination = Object.assign({}, combination, remainingCombination);
                                                    combinations.push(mergedCombination);
                                                });
                                            } else {
                                                combinations.push(combination);
                                            }
                                        }

                                        return combinations;
                                    }

                                    const variantsCombination = combinations.map(combination => {
                                        return {
                                            sku: "",
                                            price: "",
                                            stock: "",
                                            image: null,
                                            attributes: combination,
                                        }
                                    })

                                    setFieldValue("variants", variantsCombination);
                                }}
                            >
                                Genrate Variants
                            </Button>

                            <Typography variant="h6" className={styles.title}> Variants </Typography>
                            {values.variants.map((variant, index) => (
                                <div key={index} className={styles.variant}>
                                    <Typography variant="h6" className={styles.title}> Variant {index + 1} </Typography>
                                    <Typography variant="body1" className={styles.attributeLine}>
                                        {Object.keys(variant.attributes).map((key, index) => (
                                            <span key={index}>
                                                {`${key}: ${variant.attributes[key]}`}
                                                {index !== Object.keys(variant.attributes).length - 1 ? ', ' : ''}
                                            </span>
                                        ))}
                                    </Typography>
                                    <TextField
                                        id="sku"
                                        name="sku"
                                        label="SKU"
                                        variant="standard"
                                        value={variant.sku}
                                        onChange={(e) => {
                                            const newVariants = [...values.variants];
                                            const updatedVariant = {
                                                ...newVariants[index],
                                                sku: e.target.value
                                            };
                                            newVariants[index] = updatedVariant;
                                            setFieldValue("variants", newVariants);
                                        }}
                                        className={styles.input}
                                    />
                                    <TextField
                                        id="price"
                                        name="price"
                                        label="Price"
                                        variant="standard"
                                        value={variant.price}
                                        onChange={(e) => {
                                            const newVariants = [...values.variants];
                                            const updatedVariant = {
                                                ...newVariants[index],
                                                price: e.target.value
                                            };
                                            newVariants[index] = updatedVariant;
                                            setFieldValue("variants", newVariants);
                                        }}
                                        className={styles.input}
                                        typee="number"
                                    />
                                    <TextField
                                        id="stock"
                                        name="stock"
                                        label="Stock"
                                        variant="standard"
                                        value={variant.stock}
                                        onChange={(e) => {
                                            const newVariants = [...values.variants];
                                            const updatedVariant = {
                                                ...newVariants[index],
                                                stock: e.target.value
                                            };
                                            newVariants[index] = updatedVariant;
                                            setFieldValue("variants", newVariants);
                                        }}
                                        className={styles.input}
                                        type="number"
                                    />
                                    <Dropzone
                                        multiple={false}
                                        onDrop={(acceptedFiles) => {
                                            const newVariants = [...values.variants];
                                            const updatedVariant = {
                                                ...newVariants[index],
                                                image: acceptedFiles[0]
                                            };
                                            newVariants[index] = updatedVariant;
                                            setFieldValue("variants", newVariants);
                                        }}
                                    >
                                        {({ getRootProps, getInputProps }) => (
                                            <Box {...getRootProps()} className={styles.dropzone}>
                                                <input {...getInputProps()} />
                                                {!String(variant.image).startsWith('uploads') ? (
                                                    <img src={URL.createObjectURL(variant.image)} alt="product" className={styles.image} />
                                                ) : (
                                                    <>
                                                        <ImageIcon sx={{ fontSize: 100 }} />
                                                        <p>Drag 'n' drop some files here, or click to select files</p>
                                                    </>
                                                )}

                                            </Box>
                                        )}
                                    </Dropzone>

                                    <Button variant="contained" color='error' onClick={() => {
                                        const newVariants = [...values.variants];
                                        newVariants.splice(index, 1);
                                        setFieldValue("variants", newVariants);
                                    }}>Remove</Button>

                                </div>
                            ))}

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