import React from "react";
import styles from "./AccountsList.module.css";

import AccountsField from "./AccountsField/AccountsField";
import AccountsComponent from "./AccountsComponent/AccountsComponent";

const AccountsList = (props) => {
  return (
    <>
      <AccountsField
        first="Email"
        second="Role"
        third="Name"
        fourth="Actions"
        textClass={styles.header}
        lastClass={styles.header}
      />
      <hr></hr>
      {props.list.map((item, index) => (
        <AccountsComponent
          key={index}
          email={item.email}
          role={item.role}
          name={item.name}
        />
      ))}
    </>
  );
};

export default AccountsList;
