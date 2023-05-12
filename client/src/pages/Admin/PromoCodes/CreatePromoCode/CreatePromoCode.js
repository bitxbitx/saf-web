import { Alert, Box, Button, CircularProgress, LinearProgress, Snackbar, TextField } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { green } from '@mui/material/colors';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useGetProductCategoriesQuery } from '../../../../feature/services/ecom/productCategory.services';
import { useCreatePromoCodeMutation } from '../../../../feature/services/ecom/promoCode.services';
import { promoCodeSchema } from '../../../../schemas/ecom/promoCode.schema';
import styles from './CreatePromoCode.module.css';

export default function CreatePromoCode() {
    const [createPromoCode] = useCreatePromoCodeMutation();
    const { data, isLoading, error } = useGetProductCategoriesQuery();
    const history = useHistory();
    const [success, setSuccess] = React.useState(false);

    const handleSubmit = async (values) => {
        const payload = { ...values }

        createPromoCode(payload).unwrap().then(() => {
            setSuccess(true);
            setTimeout(() => {
                history.push("/admin/promo-codes");
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
                    Promo Code created successfully!
                </Alert>
            </Snackbar>}

            {/* Content */}
            {!isLoading && data.productCategories && (
                <Formik
                    initialValues={{
                        code: "TESTPROMO",
                        discountAmount: "10",
                        discountType: "percentage",
                        productCategory: [],
                        startDate: dayjs(Date.now()),
                        endDate: dayjs(Date.now()),
                        minPurchaseAmount: "25",
                        maxDiscountAmount: "100",
                        maxUsesPerUser: "2",
                        maxNumberOfUses: "55",
                        status: "active",
                        description: "Test Promo Code",

                    }}
                    validationSchema={promoCodeSchema}
                    onSubmit={handleSubmit}
                >
                    {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, setFieldValue }) => (
                        <Form className={styles.form} onSubmit={handleSubmit}>
                            <TextField
                                label="Code"
                                variant="standard"
                                name="code"
                                value={values.code}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.code && Boolean(errors.code)}
                            />
                            <TextField

                                label="Discount Amount"
                                variant="standard"
                                name="discountAmount"
                                value={values.discountAmount}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.discountAmount && Boolean(errors.discountAmount)}
                                type='number'
                            />
                            <FormControl variant="standard" sx={{ m: 0, minWidth: 120 }}>
                                <FormLabel>Discount Type</FormLabel>
                                <RadioGroup
                                    aria-label="discountType"
                                    name="discountType"
                                    value={values.discountType}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    sx={{ flexDirection: 'row' }}
                                >
                                    <FormControlLabel value="percentage" control={<Radio />} label="Percentage" />
                                    <FormControlLabel value="fixed" control={<Radio />} label="Fixed" />
                                </RadioGroup>
                            </FormControl>
                            {/* Create a MUI checkbox for product category */}
                            <FormLabel>Product Category</FormLabel>
                            <FormControl variant="standard" sx={{ m: 0, minWidth: 120, flexDirection: 'row' }} className={styles.productCategories}>
                                {data?.productCategories?.map((option) => (
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
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="Start Date"
                                    name="startDate"
                                    variant='standard'
                                    value={values.startDate}
                                    onChange={(newValue) => {
                                        setFieldValue('startDate', dayjs(newValue));
                                    }}
                                    onBlur={handleBlur}
                                    error={touched.startDate && Boolean(errors.startDate)}
                                    fullWidth
                                />
                            </LocalizationProvider>
                            <LocalizationProvider dateAdapter={AdapterDayjs} >
                                <DatePicker
                                    label="End Date"
                                    name="endDate"
                                    variant='standard'
                                    value={values.endDate}
                                    onChange={(newValue) => {
                                        setFieldValue('endDate', dayjs(newValue));
                                    }}
                                    onBlur={handleBlur}
                                    error={touched.endDate && Boolean(errors.endDate)}
                                    fullWidth
                                />
                            </LocalizationProvider>
                            <TextField
                                label="Min Purchase Amount"
                                variant="standard"
                                name="minPurchaseAmount"
                                value={values.minPurchaseAmount}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.minPurchaseAmount && Boolean(errors.minPurchaseAmount)}
                                type='number'
                            />

                            <TextField
                                label="Max Discount Amount"
                                variant="standard"
                                name="maxDiscountAmount"
                                value={values.maxDiscountAmount}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.maxDiscountAmount && Boolean(errors.maxDiscountAmount)}
                                type='number'
                            />
                            <TextField
                                label="Max Uses Per User"
                                variant="standard"
                                name="maxDiscountPerUser"
                                value={values.maxUsesPerUser}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.maxUsesPerUser && Boolean(errors.maxUsesPerUser)}
                                type='number'
                            />
                            <TextField
                                label="Max Number Of Uses"
                                variant="standard"
                                name="maxNumberOfUses"
                                value={values.maxNumberOfUses}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.maxNumberOfUses && Boolean(errors.maxNumberOfUses)}
                                type='number'
                            />

                            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                <FormLabel>Status</FormLabel>
                                <RadioGroup
                                    aria-label="status"
                                    name="status"
                                    value={values.status}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    sx={{ flexDirection: 'row' }}
                                >
                                    <FormControlLabel value="active" control={<Radio />} label="Active" />
                                    <FormControlLabel value="inactive" control={<Radio />} label="Inactive" />
                                </RadioGroup>
                            </FormControl>
                            <TextField
                                label="Description"
                                variant="standard"
                                name="description"
                                value={values.description}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.description && Boolean(errors.description)}
                                multiline
                                rows={4}
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
            )}
        </>






    )
}
