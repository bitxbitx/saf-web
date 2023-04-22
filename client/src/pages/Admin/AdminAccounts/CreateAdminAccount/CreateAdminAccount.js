import ImageIcon from '@mui/icons-material/Image';
import { Box, Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { green } from '@mui/material/colors';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { Form, Formik } from 'formik';
import React from 'react';
import Dropzone from 'react-dropzone';
import { useHistory } from 'react-router-dom';
import { useCreateUserMutation } from '../../../../feature/services/auth/user.services';
import { userSchema } from '../../../../schemas/auth/user.schema';
import styles from './CreateAdminAccount.module.css';
import { Alert, Snackbar, LinearProgress, Typography } from '@mui/material';

export default function CreateAdminAccount() {
    const [createUser, { data, isLoading, error }] = useCreateUserMutation();
    const history = useHistory();
    const [success, setSuccess] = React.useState(false);

    const handleSubmit = async (values) => {
        createUser({ ...values }).then((res) => {
            if (res.data.user) {
                setSuccess(true);
                history.push("/admin/admin-accounts");
            }
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
            {isLoading && <LinearProgress />}
            {/* Error */}
            {error && <Snackbar open={true} autoHideDuration={6000}>
                <Alert severity="error">
                    {error.data.error}
                </Alert>
            </Snackbar>}
            {/* Success */}
            {success && <Snackbar open={true} autoHideDuration={6000}>
                <Alert severity="success">
                    Successfully created admin account!
                </Alert>
            </Snackbar>}
            {/* <Typography variant="h4" color={'white'}> Create Admin Account </Typography> */}
            <Formik
                initialValues={{
                    name: "Stanley",
                    email: "stanley1214999@gmail.com",
                    username: "stanley1214999",
                    password: "password",
                    confirmPassword: "password",
                    role: "admin",
                    phoneNumber: "0123456789",
                    dob: dayjs(Date.now()),
                    ethinicity: "Asian",
                    image: null
                }}
                validationSchema={userSchema}
                onSubmit={handleSubmit}
            >
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, setFieldValue }) => (
                    <Form className={styles.form} onSubmit={handleSubmit}>
                        <TextField
                            label="Name"
                            variant="standard"
                            name="name"
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.name && Boolean(errors.name)}
                            fullWidth
                        />
                        <TextField

                            label="Email"
                            variant="standard"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.email && Boolean(errors.email)}
                            fullWidth
                        />
                        <TextField
                            label="Username"
                            variant="standard"
                            name="username"
                            value={values.username}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.username && Boolean(errors.username)}
                            fullWidth
                        />

                        <TextField
                            label="Password"
                            variant="standard"
                            name="password"
                            type='password'
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.password && Boolean(errors.password)}
                            fullWidth
                        />
                        <TextField
                            label="Confirm Password"
                            variant="standard"
                            name="confirmPassword"
                            type='password'
                            value={values.confirmPassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                            fullWidth
                        />
                        <InputLabel htmlFor="image" className={styles.input} variant='standard'>Image</InputLabel>

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
                                        <img src={URL.createObjectURL(values.image)} alt="profile picture" className={styles.image} />
                                    ) : (
                                        <>
                                            <ImageIcon sx={{ fontSize: 100 }} />
                                            <p>Drag 'n' drop some files here, or click to select files</p>
                                        </>
                                    )}
                                </Box>
                            )}
                        </Dropzone>
                        <TextField
                            label="Phone Number"
                            variant="standard"
                            name="phoneNumber"
                            type='tel'
                            value={values.phoneNumber}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                            fullWidth
                        />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Date of Birth"
                                name="dob"
                                variant='standard'
                                value={values.dob}
                                onChange={(newValue) => {
                                    setFieldValue('dob', dayjs(newValue));
                                }}
                                // renderInput={(params) => <TextField {...params} />}
                                onBlur={handleBlur}
                                error={touched.dob && Boolean(errors.dob)}
                                fullWidth
                            />
                        </LocalizationProvider>
                        <FormControl fullWidth>
                            <InputLabel size={'small'} variant='standard'>Ethinicity</InputLabel>
                            <Select
                                label="Ethinicity"
                                variant="standard"
                                name="ethinicity"
                                value={values.ethinicity}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.ethinicity && Boolean(errors.ethinicity)}
                                fullWidth
                            >
                                <MenuItem value="Asian">Asian</MenuItem>
                                <MenuItem value="Black">Black</MenuItem>
                                <MenuItem value="White">White</MenuItem>
                                <MenuItem value="Hispanic">Hispanic</MenuItem>
                                <MenuItem value="Other">Other</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel size={'small'} variant='standard'>Role</InputLabel>
                            <Select
                                label="Role"
                                variant="standard"
                                name="role"
                                value={values.role}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.role && Boolean(errors.role)}
                            >
                                <MenuItem value="admin">Admin</MenuItem>
                                <MenuItem value="staff">Staff</MenuItem>
                            </Select>
                        </FormControl>


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