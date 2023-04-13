import React from "react";
import styles from "./AccountsField.module.css";

const AccountsField = (props) => {
  return (
    <div key={props.key} className={`${styles.container} ${props.wrapperClass}`}>
      <div className={`${styles.gapSmall} ${props.textClass}`}>{props.first}</div>
      <div className={`${styles.gapSmall} ${props.textClass}`}>{props.second}</div>
      <div className={`${styles.gapBig} ${props.textClass}`}>{props.third}</div>
      <div className={`${styles.end} ${props.lastClass}`}>{props.fourth}</div>
    </div>
  );
};

export default AccountsField;