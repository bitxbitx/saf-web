import React from "react";
import styles from "./Admin.module.css";
import { Route, Switch, Redirect } from "react-router-dom";

import SideBar from "../../common/SideBar/SideBar";
import ChangePassword from "./ChangePassword/ChangePassword";
import Dashboard from "./Dashboard/Dashboard";
import EditAccount from "./Accounts/EditAccount/EditAccount";
import AddAccount from "./Accounts/AddAccount/AddAccount";
import Accounts from "./Accounts/Accounts/Accounts";
import CustomerAccount from "./Accounts/Accounts/CustomerAccount";
import AdminAccount from "./Accounts/Accounts/AdminAccount";

const Admin = (props) => {
  const generateComponents = () => {};

  return (
    <div className={styles.container}>
      <SideBar />
      <div className={styles.content}>
        <Switch>
          <Route path="/admin" exact>
            <Redirect to="/admin/dashboard" />
          </Route>
          <Route path="/admin/dashboard">
            <Dashboard />
          </Route>
          <Route path="/admin/change-password">
            <ChangePassword />
          </Route>
          <Route path="/admin/edit-account">
            <EditAccount />
          </Route>
          <Route path="/admin/add-account">
            <AddAccount />
          </Route>
          <Route path="/admin/accounts">
            <Accounts />
          </Route>
          <Route path="/admin/admin-account">
            <CustomerAccount />
          </Route>
          <Route path="/admin/customer-account">
            <AdminAccount />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default Admin;
