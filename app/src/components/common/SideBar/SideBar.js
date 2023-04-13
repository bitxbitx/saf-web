import React from "react";
import styles from "./SideBar.module.css";

import dashboardIcon from "../../../assets/icons/Dashboard.svg";
import accountsIcon from "../../../assets/icons/Accounts.svg";
import settingsIcon from "../../../assets/icons/Settings.svg";
import passwordIcon from "../../../assets/icons/Key.svg";
import logOutIcon from "../../../assets/icons/LogOut.svg";
import BrandLogo from "../BrandLogo/BrandLogo";
import SideBarList from "./SideBarList/SideBarList";

// import { useLogoutQuery } from "../../../feature/services/auth";

const SideBar = (props) => {
  // const [logout, { isLoading }] = useLogoutQuery();
  
  const sideBarComponents = [
    { label: "Dashboard", icon: dashboardIcon, description: "Dashboard icon", path: "/admin/dashboard" },
    { label: "Accounts", icon: accountsIcon, description: "Accounts icon", path: "/admin/accounts" },
    {
      label: "Customer",
      icon: accountsIcon,
      description: "Customer icon",
      subOption: true,
      path: "/admin/customer-account"
    },
    {
      label: "Admin",
      icon: accountsIcon,
      description: "Admin icon",
      subOption: true,
      path: "/admin/admin-account"
    },
    { label: "Settings", icon: settingsIcon, description: "Settings icon", path: "/admin/settings" },
    {
      label: "Change Password",
      icon: passwordIcon,
      description: "Change Password icon",
      subOption: true,
      path: "/admin/change-password"
    },
    {
      label: "Log Out",
      icon: logOutIcon,
      description: "Log Out icon",
      subOption: true,
      path: "/admin/log-out",
      // onClick: logout    
    },
    {
      label: "Dashboard",
      icon: dashboardIcon,
      description: "Dashboard icon",
      dropdown: false,
      path: "/customer/dashboard"
    },
    {
      label: "Accounts",
      icon: accountsIcon,
      description: "Accounts icon",
      dropdown: true,
      componentList: [{
        label: "Customer",
        icon: accountsIcon,
        description: "Customer icon",
        subOption: true,
        path: "/customer/customer-account"
      },
      {
        label: "Admin",
        icon: accountsIcon,
        description: "Admin icon",
        subOption: true,
        path: "/customer/admin-account"
      }]
    },

  ];

  return (
    <div className={styles.sidebar}>
      <BrandLogo />
      <SideBarList componentList={sideBarComponents} />
    </div>
  );
};

export default SideBar;
