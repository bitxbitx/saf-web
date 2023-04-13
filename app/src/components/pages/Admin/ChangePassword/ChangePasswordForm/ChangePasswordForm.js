import React from "react";

import InputField from "../../../../common/InputField/InputField";
import Button from "../../../../common/Button/Button";
import useIsValid from "../../../../../hooks/useIsValid";

const ChangePasswordForm = (props) => {
  const oldPasswordCheck = (value) => value === "123456";

  const {
    enteredInput: oldPassword,
    enteredInputIsValid: oldPasswordIsValid,
    enteredInputHasError: oldPasswordHasError,
    inputChangeHandler: onChangeOldPassword,
    inputBlurHandler: onBlurOldPassword,
    reset: resetOldPassword,
  } = useIsValid(oldPasswordCheck);

  const passwordRegex = "^[A-Za-z0-9_.@!#$%^*&\-]{8,30}$";

  const newPasswordCheck = (value) => value.match(passwordRegex);

  const {
    enteredInput: newPassword,
    enteredInputIsValid: newPasswordIsValid,
    enteredInputHasError: newPasswordHasError,
    inputChangeHandler: onChangeNewPassword,
    inputBlurHandler: onBlurNewPassword,
    reset: resetNewPassword,
  } = useIsValid(newPasswordCheck);

  const retypePasswordCheck = (value) => value === newPassword;

  const {
    enteredInput: retypePassword,
    enteredInputIsValid: retypePasswordIsValid,
    enteredInputHasError: retypePasswordHasError,
    inputChangeHandler: onChangeRetypePassword,
    inputBlurHandler: onBlurRetypePassword,
    reset: resetRetypePassword,
  } = useIsValid(retypePasswordCheck);

  return (
    <form>
      <InputField
        label="Old Password"
        type="password"
        errorMessage="Password is incorrect."
        value={oldPassword}
        error={oldPasswordHasError}
        onChange={onChangeOldPassword}
        onBlur={onBlurOldPassword}
      />
      <InputField
        label="New Password"
        type="password"
        errorMessage="Password is not within 8-30 characters long or contains illegal characters."
        value={newPassword}
        error={newPasswordHasError}
        onChange={onChangeNewPassword}
        onBlur={onBlurNewPassword}
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
      <Button label="Save" color="black" vertMargin="20px" />
    </form>
  );
};

export default ChangePasswordForm;
