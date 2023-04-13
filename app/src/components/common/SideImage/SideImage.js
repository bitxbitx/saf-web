import React from "react";
import styles from "./SideImage.module.css";

import peopleSVG from "../../../assets/images/people.svg";

const SideImage = () => {
  return (
    <div className={styles.background}>
      <img src={peopleSVG} alt="A group of people"></img>
    </div>
  );
};

export default SideImage;
