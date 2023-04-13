import React from "react";
import styles from "./SideBarList.module.css";

import SideBarComponent from "../SideBarComponent/SideBarComponent";

const SideBarList = (props) => {
  return (
    <ul className={styles.ul}>
      {props.componentList.map((component, index) => (
        <SideBarComponent
          key={index}
          label={component.label}
          icon={component.icon}
          description={component.description}
          subOption={component.subOption}
          onClick={component.onClick}
          path={component.path}
        />
      ))}
    </ul>
  );
};

export default SideBarList;
