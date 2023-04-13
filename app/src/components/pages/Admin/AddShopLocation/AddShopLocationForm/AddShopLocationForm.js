import React from "react";
import { Form, Formik } from "formik";
import InputField from "../../../../common/InputField/InputField";
import Button from "../../../../common/Button/Button";
import { useCreateShopLocationMutation } from "../../../../../feature/services/shopLocation";
import { useHistory } from "react-router-dom";
import { shopLocationSchema } from "../../../../../schemas/shopLocationSchema";

const AddShopLocationForm = (props) => {
    const [createShopLocation] = useCreateShopLocationMutation();
    const history = useHistory();

    return (
        <Formik
            initialValues={{
                name: "",
                address: "",
                city: "",
                state: "",
                zip: "",
                phone: "",
                longitude: "",
                latitude: "",
            }}
            validationSchema={shopLocationSchema}
            onSubmit={(values, { setSubmitting }) => {
                console.log("values", values)
                createShopLocation(values).then((res) => {
                    console.log(res);
                    history.push("/admin/shop-location");
                }, setSubmitting(false));
            }}
        >
            {({ isSubmitting }) => (
                <Form>
                    <InputField label="Shop Name" name="name" type="text" placeholder="Shop Name" />
                    <InputField label="Shop Address" name="address" type="text" placeholder="Shop Address" />
                    <InputField label="Shop City" name="city" type="text" placeholder="Shop City" />
                    <InputField label="Shop State" name="state" type="text" placeholder="Shop State" />
                    <InputField label="Shop Zip" name="zip" type="text" placeholder="Shop Zip" />
                    <InputField label="Shop Phone" name="phone" type="text" placeholder="Shop Phone" />
                    <InputField label="Longitude" name="longitude" type="text" placeholder="Longitude" />
                    <InputField label="Latitude" name="latitude" type="text" placeholder="Latitude" />
                    <Button label="Save" color="black" type="submit" disabled={isSubmitting} />
                </Form>
            )}
        </Formik>
    );
};

export default AddShopLocationForm;

