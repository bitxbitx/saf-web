import * as yup from 'yup';

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
// min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

const usernameRegex = "^[A-Za-z0-9_.@-]{8,30}$";

export const adminAccountSchema = yup.object().shape({
    username: yup.string()
        .matches(usernameRegex, "Username is not within 8-30 characters long or contains illegal characters.")
        .required('Username is required'),
    password: yup
        .string()
        .min(5)
        .matches(passwordRules, { message: "Password must contain at 1 upper case letter, 1 lower case letter, and 1 numeric digit." })
        .required("Required"),
    confirmPassword: yup.string().required('Confirm password is required').oneOf([yup.ref('password'), null], 'Passwords must match'),
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    email: yup.string().email('Invalid email').required('Email is required')
});

