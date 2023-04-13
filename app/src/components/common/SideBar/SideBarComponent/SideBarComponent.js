import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./SideBarComponent.module.css";

const SideBarComponent = (props) => {
  return (
    <NavLink to={props.path} activeClassName={styles.active}>
      <li
        className={styles.container}
        id={props.subOption ? styles.subOption : ""}
        onClick={props.onClick}
      >
        <img id={props.label} src={props.icon} alt={props.description} />
        <label htmlFor={props.label}>{props.label}</label>
      </li>
    </NavLink>
  );
};

export default SideBarComponent;
