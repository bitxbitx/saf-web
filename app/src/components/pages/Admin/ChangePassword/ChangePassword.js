import React from "react";
import styles from "./ChangePassword.module.css";

import Heading from "../../../common/Heading/Heading";
import ChangePasswordForm from "./ChangePasswordForm/ChangePasswordForm";

const ChangePassword = (props) => {
  return (
    <div className={styles.container}>
      <Heading title="Change Password" />
      <ChangePasswordForm />
    </div>
  );
};

export default ChangePassword;
