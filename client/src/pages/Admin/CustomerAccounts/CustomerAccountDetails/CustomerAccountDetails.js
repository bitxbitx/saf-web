import ImageIcon from '@mui/icons-material/Image';
import { Alert, Box, Button, CircularProgress, InputLabel, LinearProgress, MenuItem, Select, Snackbar, TextField } from '@mui/material';
import { green } from '@mui/material/colors';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Form, Formik } from 'formik';
import React from 'react';
import Dropzone from 'react-dropzone';
import { useHistory, useParams } from 'react-router-dom';
import { useGetUserQuery, useUpdateUserMutation } from '../../../../feature/services/auth/user.services';
import { userSchema } from '../../../../schemas/auth/user.schema';
import styles from './CustomerAccountDetails.module.css';
import dayjs from 'dayjs';

export default function CustomerAccountDetails() {
    const { id } = useParams();
    const { data, error, isLoading } = useGetUserQuery(id);
    const [updateUser] = useUpdateUserMutation();
    const [success, setSuccess] = React.useState(false);
    const history = useHistory();


    const handleSubmit = async (values) => {
       const data = { ...values };

        updateUser({ id: id, ...data }).unwrap().then(() => {
            setSuccess(true);
            setTimeout(() => {
                history.push("/admin/customer-accounts");
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
            {!isLoading && data && data.user && (
                <>
                    <Formik
                        initialValues={{
                            name: data?.user?.name,
                            email: data?.user?.email,
                            password: "",
                            confirmPassword: "",
                            role: data?.user?.role || "customer",
                            dob: dayjs(new Date(data?.user?.dob || Date.now())),
                            ethinicity: data?.user?.ethinicity || "asian",
                            image: null,
                            username: data?.user?.username,
                            phoneNumber: data?.user?.phoneNumber,
                        }}
                        // validationSchema={userSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue, isSubmitting }) => (
                            <Form className={styles.form} onSubmit={handleSubmit}>
                                <TextField
                                    fullWidth
                                    id="name"
                                    name="name"
                                    label="Name"
                                    variant="standard"
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.name && Boolean(errors.name)}
                                />
                                <TextField
                                    fullWidth
                                    id="email"
                                    name="email"
                                    label="Email"
                                    variant="standard"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.email && Boolean(errors.email)}
                                />
                                <TextField
                                    fullWidth
                                    id="username"
                                    name="username"
                                    label="Username"
                                    variant="standard"
                                    value={values.username}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.username && Boolean(errors.username)}
                                />

                                <TextField
                                    fullWidth
                                    id="password"
                                    name="password"
                                    label="Password"
                                    variant="standard"
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.password && Boolean(errors.password)}
                                    type='password'
                                />
                                <TextField
                                    fullWidth
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    variant="standard"
                                    value={values.confirmPassword}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                                    type='password'
                                />
                                <InputLabel id="role-label">Role</InputLabel>
                                <Select
                                    disabled={true}
                                    fullWidth
                                    id="role"
                                    name="role"
                                    label="Role"
                                    variant="standard"
                                    value={values.role}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.role && Boolean(errors.role)}
                                >
                                    <MenuItem value="customer">Customer</MenuItem>
                                    <MenuItem value="user">User</MenuItem>
                                </Select>
                                <TextField
                                    fullWidth
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    label="Phone Number"
                                    variant="standard"
                                    value={values.phoneNumber}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                                />

                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        label="Date of Birth"
                                        value={values.dob}
                                        variant='standard'
                                        onChange={(newValue) => {
                                            setFieldValue('departureDate', Date.parse(newValue));
                                        }}
                                        onBlur={handleBlur}
                                        error={touched.dob && Boolean(errors.dob)}
                                        fullWidth
                                    // renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                                <InputLabel id="ethinicity-label">Ethinicity</InputLabel>
                                <Select
                                    fullWidth
                                    id="ethinicity"
                                    name="ethinicity"
                                    label="Ethinicity"
                                    variant="standard"
                                    value={values.ethinicity}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.ethinicity && Boolean(errors.ethinicity)}
                                >
                                    <MenuItem value="asian">Asian</MenuItem>
                                    <MenuItem value="black">Black</MenuItem>
                                    <MenuItem value="hispanic">Hispanic</MenuItem>
                                    <MenuItem value="white">White</MenuItem>
                                </Select>
                                <Dropzone
                                    multiple={false}
                                    onDrop={(acceptedFiles) => {
                                        setFieldValue('image', acceptedFiles[0]);
                                    }}
                                >
                                    {({ getRootProps, getInputProps }) => (
                                        <Box

                                            {...getRootProps()}
                                            className={styles.dropzone}
                                        >
                                            <input {...getInputProps()} />
                                            {values.image ? (
                                                <img src={URL.createObjectURL(values.image)} alt="user profile pic" className={styles.image} />
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
                </>
            )}
        </>
    )
}
