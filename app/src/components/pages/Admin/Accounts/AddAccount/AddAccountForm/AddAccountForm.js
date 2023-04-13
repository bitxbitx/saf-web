import React from "react";

import Button from "../../../../../common/Button/Button";
import DropDown from "../../../../../common/DropDown/DropDown";
import InputField from "../../../../../common/InputField/InputField";

import useIsValid from "../../../../../../hooks/useIsValid";

const AddAccountForm = (props) => {
  const usernameRegex = "^[A-Za-z0-9_.@\-]{8,30}$";

  const usernameCheck = (value) => value.match(usernameRegex);

  const {
    enteredInput: username,
    enteredInputIsValid: usernameIsValid,
    enteredInputHasError: usernameHasError,
    inputChangeHandler: onChangeUsername,
    inputBlurHandler: onBlurUsername,
    reset: resetUsername,
  } = useIsValid(usernameCheck);

  const passwordRegex = "^[A-Za-z0-9_.@!#$%^*&\-]{8,30}$";

  const passwordCheck = (value) => value.match(passwordRegex);

  const {
    enteredInput: password,
    enteredInputIsValid: passwordIsValid,
    enteredInputHasError: passwordHasError,
    inputChangeHandler: onChangePassword,
    inputBlurHandler: onBlurPassword,
    reset: resetPassword,
  } = useIsValid(passwordCheck);

  const retypePasswordCheck = (value) => value === password;

  const {
    enteredInput: retypePassword,
    enteredInputIsValid: retypePasswordIsValid,
    enteredInputHasError: retypePasswordHasError,
    inputChangeHandler: onChangeRetypePassword,
    inputBlurHandler: onBlurRetypePassword,
    reset: resetRetypePassword,
  } = useIsValid(retypePasswordCheck);

  const emailCheck = (value) => value.includes("@") && value.includes(".com");
 
  const {
    enteredInput: email,
    enteredInputIsValid: emailIsValid,
    enteredInputHasError: emailHasError,
    inputChangeHandler: onChangeEmail,
    inputBlurHandler: onBlurEmail,
    reset: resetEmail,
  } = useIsValid(emailCheck);

  const submitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={submitHandler}>
      <InputField
        label="Username"
        type="text"
        errorMessage="Username is not within 8-30 characters long or contains illegal characters."
        value={username}
        error={usernameHasError}
        onChange={onChangeUsername}
        onBlur={onBlurUsername}
      />
      <InputField
        label="Password"
        type="password"
        errorMessage="Password is not within 8-30 characters long or contains illegal characters."
        value={password}
        error={passwordHasError}
        onChange={onChangePassword}
        onBlur={onBlurPassword}
      />
      <InputField
        label="Re-type Password"
        type="password"
        errorMessage="Passwords do not match."
        value={retypePassword}
        error={retypePasswordHasError}
        onChange={onChangeRetypePassword}
        onBlur={onBlurRetypePassword}
      />
      <InputField
        label="Email"
        type="text"
        errorMessage="Please enter a valid email."
        value={email}
        error={emailHasError}
        onChange={onChangeEmail}
        onBlur={onBlurEmail}
      />
      <DropDown label="Role" options={[{ value: "Testing" }]} />
      <Button label="Save" color="black" vertMargin="20px" />
    </form>
  );
};

export default AddAccountForm;
