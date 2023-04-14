import React from "react";
import styles from "./Accounts.module.css";

import { Alert, CircularProgress, Snackbar } from "@mui/material";
import AddIcon from "../../../../../assets/icons/Add.svg";
import Button from "../../../../common/Button/Button";
import Heading from "../../../../common/Heading/Heading";
import AccountsList from "./AccountsList/AccountsList";

const Accounts = (props) => {

  return (
    <div className={styles.container}>
      <Heading
        title="Accounts"
        description="Lörem ipsum anaktig päng tiseligt bigt nörar monoska. Tisos bion heterofonat, akangen och osyska, pogörade syra. Anaren resm epida, ade songen. "
      >
        <Button
          label="Add Account"
          color="black"
          width="140px"
          height="40px"
          icon={AddIcon}
          fontWeight="500"
        />
      </Heading>
      {/* {adminError && (
        <Snackbar open={adminIsError} autoHideDuration={6000}>
          <Alert severity="success" sx={{ width: "100%" }}>
            {adminError.toString()}
          </Alert>
        </Snackbar>
      )}
      {customerError && (
        <Snackbar open={customerIsError} autoHideDuration={6000}>
          <Alert severity="success" sx={{ width: "100%" }}>
            {customerError.toString()}
          </Alert>
        </Snackbar>
      )} */}
      {/* {adminIsLoading || customerIsLoading ? (
        <CircularProgress color="#000000" />
      ) : (
        <AccountsList list={[...adminData, ...customerData]} />
      )} */}
    </div>
  );
};

export default Accounts;
