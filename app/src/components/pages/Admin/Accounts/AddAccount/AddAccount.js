import React from "react";
import styles from "./AddAccount.module.css";

import Heading from "../../../../common/Heading/Heading";
import AddAccountForm from "./AddAccountForm/AddAccountForm";

const AddAccount = (props) => {
  return (
    <div className={styles.container}>
      <Heading title="Add Account" />
      <AddAccountForm />
    </div>
  );
};

export default AddAccount;
