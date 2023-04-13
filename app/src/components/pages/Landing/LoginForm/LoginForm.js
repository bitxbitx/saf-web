import React from "react";

import CloseIcon from '@mui/icons-material/Close';
import { Alert, Box, Collapse, IconButton } from "@mui/material";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useLoginMutation } from "../../../../feature/services/auth";
import Button from "../../../common/Button/Button";
import ForgotPassword from "../../../common/Button/ForgotPassword/ForgotPassword";
import Heading from "../../../common/Heading/Heading";
import InputField from "../../../common/InputField/InputField";

const LoginForm = (props) => {
  const [ login, { isLoading }] = useLoginMutation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');

  const loginHandler = async (e) => {
    e.preventDefault();
    setOpen(false);
    try {
      const payload = await login({ email: email, password: password }).unwrap();
      console.log(payload);
      history.push('/admin')
    } catch (err) {
      console.log(err)
      setOpen(true);
      setError(err.data.message)
    }
  };

  // TODO - Add a loading spinner
  return (
    <form onSubmit={loginHandler}>
      <Heading title="Login" />
      <InputField label="Email or Username" type="text" value={email} onChange={(e) => { setEmail(e.target.value) }} />
      <InputField label="Password" type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
      <Box sx={{ width: '100%' }}>
        <Collapse in={open}>
          <Alert
            severity="error"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            {error}
          </Alert>
        </Collapse>
      </Box>
      <Link to="/landing/account-recovery">
        <ForgotPassword />
      </Link>

      <Button
        label="Login"
        btnColor="#8bd5f8"
        color="black"
        vertMargin="20px"
      />
      {/* <hr id={styles.line}></hr>
      <Button
        label="Register an Account"
        btnColor="#3C9EDF"
        vertMargin="20px"
        onClick={ () => { history.push('/landing/register') } }
      /> */}
    </form>
  );
};

export default LoginForm;
