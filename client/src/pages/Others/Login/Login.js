import React, { useEffect } from "react";
import styles from "./Login.module.css";

import LoginForm from "./LoginForm/LoginForm";
import AccountRecoveryForm from "./AccountRecoveryForm/AccountRecoveryForm";
import SideImage from "./SideImage/SideImage";
import { Switch, Route } from "react-router-dom";
import { useMeQuery } from "../../../feature/services/auth/auth.services";
import { useHistory } from "react-router-dom";

const Login = (props) => {
  return (
    <div className={styles.col}>
      <div className={styles.container}>
        <Switch>
          <Route path="/login" exact>
            <LoginForm />
          </Route>
          {/* <Route path="/auth/account-recovery" exact>
            <AccountRecoveryForm />
          </Route> */}
        </Switch>
      </div>
      <div id={styles.img}>
        <SideImage />
      </div>
    </div>
  );
};

export default Login;
