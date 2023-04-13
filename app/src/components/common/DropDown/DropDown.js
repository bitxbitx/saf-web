import React from "react";
import styles from "./DropDown.module.css";
import classnames from 'classnames';

const DropDown = (props) => {
  const valid = true;

  return (
    <div className={classnames(styles.field, valid ? styles.valid : styles.invalid)}>
      <label htmlFor={props.label}>{props.label}</label>
      <select id={props.label}>
        <option className={styles.placeholder} value="" hidden>{props.label}</option>
        {props.options.map((option, index) => {
          return <option key={index} value={option.value}>{option.value}</option>;
        })}
      </select>
    </div>
  );
};

export default DropDown;
