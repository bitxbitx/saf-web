import React from "react";
import styles from "./InputField.module.css";
import classnames from "classnames";

const InputField = (props) => {

  return (
    <div
      className={classnames(
        styles.field,
        !props.error ? styles.valid : styles.invalid
      )}
    >
      <label htmlFor={props.label}>{props.label}</label>
      <input
        id={props.label}
        placeholder={props.label}
        type={props.type}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
      {props.error && <p>{props.errorMessage}</p>}
    </div>
  );
};

export default InputField;
