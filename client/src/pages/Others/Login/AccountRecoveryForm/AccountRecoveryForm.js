import React from "react";
import styles from "./AccountRecoveryForm.module.css";
import { Typography, TextField, Button, Box, CircularProgress } from "@mui/material";
import { Formik, Form } from "formik";
import { useForgotPasswordMutation } from "../../../../feature/services/auth/auth.services";
import * as Yup from "yup";
import { green } from '@mui/material/colors';


const AccountRecoveryForm = (props) => {
  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Required"),
  });

  const [forgotPassword, { data, isLoading, error }] = useForgotPasswordMutation();
  const [success, setSuccess] = React.useState(false);

  const onSubmit = (values) => {
    forgotPassword(values);
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
      <Typography variant="h4" className={styles.title}> Account Recovery </Typography>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <Form className={styles.form} onSubmit={handleSubmit}>
            <TextField
              id="email"
              name="email"
              label="Email"
              variant="standard"
              fullWidth
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
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

    </>
  );
};

export default AccountRecoveryForm;
