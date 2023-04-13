import React from "react";
import styles from "./AccountsComponent.module.css";

import AccountsField from "../AccountsField/AccountsField";
import Button from "../../../../../../common/Button/Button";
import DeleteIcon from "../../../../../../../assets/icons/Delete.svg";
import EditIcon from "../../../../../../../assets/icons/Edit.svg";
import { useDeleteAdminMutation } from "../../../../../../../feature/services/admin";
import { useDeleteCustomerMutation } from "../../../../../../../feature/services/customer";

const AccountsComponent = (props) => {
  return (
    <AccountsField
      first={props.email}
      second={props.role}
      third={props.name}
      fourth={
        <>
          <Button
            label="Delete"
            btnColor="#17232B"
            color="rgba(207, 102, 121, 0.87)"
            width="90px"
            height="36px"
            icon={DeleteIcon}
            fontWeight="400"
            marginRight="5px"
            className={styles.btnGap}
          />
          <Button
            label="Edit"
            btnColor="#17232B"
            color="rgba(139, 213, 248, 0.87)"
            width="90px"
            height="36px"
            icon={EditIcon}
            fontWeight="400"
            marginRight="5px"
          />
        </>
      }
      wrapperClass={styles.wrapper}
      textClass={styles.para}
      lastClass={styles.btnContainer}
    />
  );
};

export default AccountsComponent;
