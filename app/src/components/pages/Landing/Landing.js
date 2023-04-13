import React, { useEffect } from "react";
import styles from "./Landing.module.css";

import LoginForm from "./LoginForm/LoginForm";
import AccountRecoveryForm from "./AccountRecoveryForm/AccountRecoveryForm";
import SideImage from "../../common/SideImage/SideImage";
import { Route } from "react-router-dom";

const Landing = (props) => {

  // useEffect(() => {
  //   try {



  return (
    <div className={styles.col}>
      <div className={styles.container}>
        <Route path="/landing" exact>
          <LoginForm />
        </Route>
        <Route path="/landing/account-recovery">
          <AccountRecoveryForm />
        </Route>
      </div>
      <div id={styles.img}>
        <SideImage />
      </div>
    </div>
  );
};

export default Landing;
