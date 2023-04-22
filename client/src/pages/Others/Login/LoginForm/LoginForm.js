import React from "react";
import styles from "./LoginForm.module.css";
import { Typography, TextField, Button, Box, CircularProgress } from "@mui/material";
import { Formik, Form } from "formik";
import { useLoginMutation } from "../../../../feature/services/auth/auth.services";
import * as Yup from "yup";
import { green } from '@mui/material/colors';
import { useHistory, Link } from "react-router-dom";
import { Alert, Snackbar } from "@mui/material";

const LoginForm = (props) => {
  const initialValues = {
    usernameEmailOrPhoneNumber: "johndoe22",
    password: "password",
  };

  const validationSchema = Yup.object({
    usernameEmailOrPhoneNumber: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
  });

  const [login, { data, isLoading, error }] = useLoginMutation();
  const [success, setSuccess] = React.useState(false);
  const history = useHistory();

  const onSubmit = (values) => {
    login(values).then((res) => {
      if (res.data.user) {
        setSuccess(true);
        history.push("/admin");
      }
    });
    
  };
      

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
      {error && <Snackbar open={true} autoHideDuration={6000}>
        <Alert severity="error">
          {error.data.error}
        </Alert>
      </Snackbar>}

      <Typography variant="h4" color={'white'}> Login </Typography>
      <Formik
        initialValues={initialValues}
        // validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <Form className={styles.form} onSubmit={handleSubmit}>
            <TextField
              id="usernameEmailOrPhoneNumber"
              name="usernameEmailOrPhoneNumber"
              label="Username, Email or Phone Number"
              variant="standard"
              fullWidth
              value={values.usernameEmailOrPhoneNumber}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.usernameEmailOrPhoneNumber && Boolean(errors.usernameEmailOrPhoneNumber)}
              helperText={touched.usernameEmailOrPhoneNumber && errors.usernameEmailOrPhoneNumber}
            />
            <TextField
              id="password"
              name="password"
              label="Password"
              variant="standard"
              fullWidth
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              type="password"
            />
            {/* <Link to="/account-recovery" className={styles.link}>Forgot password?</Link> */}
            <Box sx={{ m: 1, position: 'relative' }}>
              <Button
                variant="contained"
                sx={buttonSx}
                disabled={isSubmitting && !error}
                type="submit"
                fullWidth
              >
                Login
              </Button>
              {isLoading && !error && (
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
  );

};

export default LoginForm;
