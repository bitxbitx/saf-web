import React from "react";
import styles from "./AddShopLocation.module.css";

import Heading from "../../../common/Heading/Heading";
import AddShopLocationForm from "./AddShopLocationForm/AddShopLocationForm";

const AddShopLocation = (props) => {
    return (
        <div className={styles.container}>
        <Heading title="Add Shop Location" />
        <AddShopLocationForm />
        </div>
    );
    };

export default AddShopLocation;
