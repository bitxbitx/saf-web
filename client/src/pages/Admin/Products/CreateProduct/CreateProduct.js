import ImageIcon from '@mui/icons-material/Image';
import { Alert, Box, Button, CircularProgress, FormControl, InputLabel, LinearProgress, MenuItem, Select, Snackbar, TextField, Typography } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { green } from '@mui/material/colors';
import { Form, Formik, Field } from 'formik';
import React from 'react';
import Dropzone from 'react-dropzone';
import { useHistory } from 'react-router-dom';
import { useCreateProductMutation } from '../../../../feature/services/ecom/product.services';
import { useGetProductCategoriesQuery } from '../../../../feature/services/ecom/productCategory.services';
import { productSchema } from '../../../../schemas/ecom/product.schema';
import { useCreateProductVariantMutation } from '../../../../feature/services/ecom/productVariant.services';
import styles from './CreateProduct.module.css';
import { Checkbox } from '@mui/material';


export default function CreateProduct() {
    const [createProduct] = useCreateProductMutation();
    const [createProductVariant] = useCreateProductVariantMutation();
    const { data: productCategories } = useGetProductCategoriesQuery();
    const history = useHistory();
    const [success, setSuccess] = React.useState(false);
    const [attributes, setAttributes] = React.useState([]);

    const handleSubmit = async (values) => {
        try {
            const { variants, ...rest } = values;
            const newAttributes = {};
            attributes.forEach((attribute) => {
                newAttributes[attribute.name] = attribute.value;
            });
            createProduct({attributes:newAttributes, ...rest}).unwrap().then((res) => {
                const { _id } = res.product;
                variants.forEach(async (variant) => {
                    console.log("variant", variant)
                    console.log("{product: _id, ...variant}", { product: _id, ...variant })
                    const { data } = await createProductVariant({ product: _id, ...variant, stock:23 }).unwrap();
                });

                setSuccess(true);
                setTimeout(() => {
                    history.push('/admin/products');
                }, 2000);
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

            <Formik
                initialValues={{
                    name: "TEST PRODUCT",
                    description: "TEST PRODUCT DESCRIPTION",
                    image: null,
                    productCategory: [],
                    // productDetail: "TEST PRODUCT DETAIL",
                    sku: "TEST SKU",
                    stock: 100,
                    price: 100,
                    quantity: 100,
                    status: "active",
                    variants: []
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
                                        price: 0,
                                        stock: 0,
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
                                    id="stock"
                                    name="stock"
                                    label="Stock"
                                    variant="standard"
                                    value={variant.stock}
                                    onChange={(e) => {
                                        const newVariants = [...values.variants];
                                        newVariants[index].stock = e.target.value;
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