import React from "react";
import styles from "./Dashboard.module.css";

import Heading from "../../../common/Heading/Heading";

const Dashboard = (props) => {
  return (
    <div className={styles.container}>
      <Heading
        title="Dashboard"
        description="Lörem ipsum anaktig päng tiseligt bigt nörar monoska. Tisos bion heterofonat, akangen och osyska, pogörade syra. Anaren resm epida, ade songen. "
      />
      <p className={styles.temp}>Just some text here I guess</p>
    </div>
  );
};

export default Dashboard;
