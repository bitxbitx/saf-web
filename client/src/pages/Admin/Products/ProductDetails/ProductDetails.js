import ImageIcon from '@mui/icons-material/Image';
import { Alert, Box, Button, CircularProgress, FormControl, InputLabel, LinearProgress, MenuItem, Select, Snackbar, TextField, Typography } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { green } from '@mui/material/colors';
import { Form, Formik, Field } from 'formik';
import React from 'react';
import Dropzone from 'react-dropzone';
import { useHistory } from 'react-router-dom';
import { useUpdateProductMutation, useGetProductQuery } from '../../../../feature/services/ecom/product.services';
import { useGetProductCategoriesQuery } from '../../../../feature/services/ecom/productCategory.services';
import { productSchema } from '../../../../schemas/ecom/product.schema';
import { useUpdateProductVariantMutation, useCreateProductVariantMutation } from '../../../../feature/services/ecom/productVariant.services';
import styles from './ProductDetails.module.css';
import { Checkbox } from '@mui/material';
import { useParams } from 'react-router-dom';

export default function ProductDetails() {
    const { data: productCategories, isLoading, error } = useGetProductCategoriesQuery();
    const history = useHistory();
    const [success, setSuccess] = React.useState(false);
    const [attributes, setAttributes] = React.useState([]);
    const { id } = useParams();
    const [updateProduct, { isLoading: isUpdating, error: updateError }] = useUpdateProductMutation();
    const [updateProductVariant, { isLoading: isUpdatingVariant, error: updateVariantError }] = useUpdateProductVariantMutation();
    const [createProductVariant, { isLoading: isCreatingVariant, error: createVariantError }] = useCreateProductVariantMutation();
    const { data: product, isLoading: isProductLoading, error: productError } = useGetProductQuery(id);

    const handleSubmit = async (values) => {
        try {
            const { variants, ...rest } = values;
            updateProduct({ id, ...rest }).unwrap().then((res) => {
                const { _id } = res.product;
                variants.forEach(async (variant) => {
                    if (variant._id) {
                        await updateProductVariant({ id: variant._id, ...variant }).unwrap();
                    } else {
                        await createProductVariant({ product: _id,...variant}).unwrap();
                    }
                });

                // setSuccess(true);
                // history.push("/admin/products");
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
                    productCategory: product?.product?.productCategory || [],
                    productDetail: product?.product?.productDetail || "",
                    variants: product?.product?.variants || [],
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
                        <TextField
                            id="productDetail"
                            name="productDetail"
                            label="Product Detail"
                            variant="standard"
                            value={values.productDetail}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.productDetail && Boolean(errors.productDetail)}
                            className={styles.input}
                        />
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
                                <Typography variant="h6">Attributes</Typography>
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
                                        inventoryStock: "",
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
                                {Object.keys(variant.attributes).map((key, index) => (
                                    <div key={index} className={styles.attribute}>
                                        {key}: {variant.attributes[key]}
                                    </div>
                                ))}
                                <TextField
                                    id="sku"
                                    name="sku"
                                    label="SKU"
                                    variant="standard"
                                    value={variant.sku}
                                    onChange={(e) => {
                                        const newVariants = [...values.variants];
                                        newVariants[index].sku = e.target.value;
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
                                        newVariants[index].price = e.target.value;
                                        setFieldValue("variants", newVariants);
                                    }}
                                    className={styles.input}
                                    typee="number"
                                />
                                <TextField
                                    id="inventoryStock"
                                    name="inventoryStock"
                                    label="Inventory Stock"
                                    variant="standard"
                                    value={variant.inventoryStock}
                                    onChange={(e) => {
                                        const newVariants = [...values.variants];
                                        newVariants[index].inventoryStock = e.target.value;
                                        setFieldValue("variants", newVariants);
                                    }}
                                    className={styles.input}
                                    type="number"
                                />
                                <Dropzone
                                    multiple={false}
                                    onDrop={(acceptedFiles) => {
                                        const newVariants = [...values.variants];
                                        newVariants[index].image = acceptedFiles[0];
                                        setFieldValue("variants", newVariants);
                                    }}
                                >
                                    {({ getRootProps, getInputProps }) => (
                                        <Box {...getRootProps()} className={styles.dropzone}>
                                            <input {...getInputProps()} />
                                            {variant.image ? (
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