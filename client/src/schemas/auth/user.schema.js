import * as yup from 'yup';

export const userSchema = yup.object().shape({
    email: yup.string().email().required("Please add an email address"),
    password: yup.string().min(8).required("Please add a password"),
    username: yup.string().required("Please add a username"),
    confirmPassword: yup.string().required('Confirm password is required').oneOf([yup.ref('password'), null], 'Passwords must match'),
    name: yup.string().required("Please add a name"),
    role: yup.string().required("Please add a role"),
    phoneNumber: yup.string().required("Please add a phone number"),
    image: yup.string(),
    dob: yup.date(),
    ethinicity: yup.string(),    
});
