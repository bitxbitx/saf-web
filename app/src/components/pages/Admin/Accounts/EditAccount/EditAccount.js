import React from "react";
import styles from "./EditAccount.module.css";

import Heading from "../../../../common/Heading/Heading";
import EditAccountForm from "./EditAccountForm/EditAccountForm";

const EditAccount = (props) => {
  return (
    <div className={styles.container}>
      <Heading title="Edit Account" />
      <EditAccountForm />
    </div>
  );
};

export default EditAccount;
