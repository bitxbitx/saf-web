import React from "react";
import styles from "./Heading.module.css";

const Heading = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h1>{props.title}</h1>
        {props.children}
      </div>
      {props.description && <p>{props.description}</p>}
    </div>
  );
};

export default Heading;
