import React from "react";
import styles from "./Button.module.css";

const Button = (props) => {
  return (
    <div className={`${styles.btn} ${props.className}`}>
      <button
        style={{
          backgroundColor: `${props.btnColor ? props.btnColor : "#8bd5f8"}`,
          color: `${props.color ? props.color : "white"}`,
          width: `${props.width ? props.width : "100%"}`,
          height: `${props.height ? props.height : "50px"}`,
          margin: `${
            props.vertMargin || props.horMargin
              ? (props.vertMargin ? props.vertMargin : "0px") + " " + props.horMargin
              : "auto"
          }`,
          fontWeight: `${props.fontWeight ? props.fontWeight : "600"}`
        }}
        onClick={props.onClick}
      >
        <div className={styles.container}>
        {props.icon && <img src={props.icon} alt={props.alt} style={{marginRight: `${props.marginRight ? props.marginRight : "10px"}`}}/>}
        {props.label}
        </div>
      </button>
    </div>
  );
};

export default Button;
