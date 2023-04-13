import React from "react";
import styles from "./ShopLocation.module.css";

import { useGetShopLocationQuery } from "../../../../feature/services/shopLocation";
import { useHistory } from "react-router-dom";
import TwoColumnList from "../../../common/TwoColumnList/TwoColumnList";

import { Alert, Snackbar } from "@mui/material";
import AddIcon from "../../../../assets/icons/Add.svg";
import Button from "../../../common/Button/Button";
import Heading from "../../../common/Heading/Heading";
import { BounceLoader } from "react-spinners";

const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};

// TODO: change no data found

const ShopLocation = (props) => {
    const { data, isError, error, isLoading } = useGetShopLocationQuery();
    const history = useHistory();

    const shopLocations = data?.data?.data || [];
    const shopLocationList = shopLocations?.map((shopLocation) => {
        return {
            label: shopLocation.name,
            value: shopLocation.address,
            path: `/admin/shop-location/${shopLocation.id}`,
            otherFields: [
                {
                    label: "Longitude",
                    value: shopLocation.longitude
                },
                {
                    label: "Latitude",
                    value: shopLocation.latitude
                }
            ]
        }
    });

    return (
        <div className={styles.container}>
            <Heading
                title="Shop Locations"
                description="Lörem ipsum anaktig päng tiseligt bigt nörar monoska. Tisos bion heterofonat, akangen och osyska, pogörade syra. Anaren resm epida, ade songen. "
            >
                <Button
                    label="Add Shop Location"
                    color="black"
                    width="200px"
                    height="40px"
                    icon={AddIcon}
                    fontWeight="500"
                    onClick={() => history.push("/admin/add-shop-location")}
                />
            </Heading>
            {isError && (
                <Snackbar open={isError} autoHideDuration={6000}>
                    <Alert severity="success" sx={{ width: "100%" }}>
                        {error.toString()}
                    </Alert>
                </Snackbar>
            )}
            {isLoading ? (
                <BounceLoader
                    color={"#8BD5F899"}
                    loading={isLoading}
                    cssOverride={override}
                    size={150}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            ) : ( shopLocationList.length === 0 ? (
                <div className={styles.noData}>
                    <h1>No Data Found</h1>
                </div>
            ):( 
                <TwoColumnList list={shopLocationList} />
            ))
            }
        </div>
    );
};

export default ShopLocation;