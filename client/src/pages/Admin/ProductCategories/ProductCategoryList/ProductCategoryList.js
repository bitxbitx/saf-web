import { Alert, LinearProgress, Snackbar } from '@mui/material';
import React from 'react';
import { useHistory } from 'react-router-dom';
import NothingFoundSvg from '../../../../assets/img/NothingFound.svg';
import InfoCard from '../../../../components/InfoCard/InfoCard';
import { useDeleteProductCategoryMutation, useGetProductCategoriesQuery } from '../../../../feature/services/ecom/productCategory.services';
import styles from './ProductCategoryList.module.css';

export default function ProductCategoryList() {
    const { data, error, isLoading } = useGetProductCategoriesQuery();
    const [deleteProductCategory] = useDeleteProductCategoryMutation();
    const history = useHistory();

    const handleEdit = (id) => {
        history.push(`/admin/product-categories/${id}`);
    }

    const handleDelete = (id) => {
        deleteProductCategory(id);
    }

    

    return (
        <>
            {/* Loading */}
            {isLoading && <LinearProgress color="primary" />}
            {/* Error Handling */}
            {error && <Snackbar open={true} autoHideDuration={6000}>
                <Alert severity="error">
                {error.message ? error.message : "Something went wrong! Please try again later."}
                </Alert>
            </Snackbar>}
            {/* Content */}
            <div className={styles.container}>
                {data?.productCategories?.length > 0 ? data?.productCategories?.map((productCategory) => (
                    <InfoCard
                        key={productCategory._id}
                        image={productCategory.image}
                        title={productCategory.name}
                        properties={{ "Description": productCategory.description }}
                        editFunc={() => handleEdit(productCategory._id)}
                        deleteFunc={() => handleDelete(productCategory._id)}
                    />
                )) : <div className={styles.nothingFound}>
                    <img src={NothingFoundSvg} alt="Nothing Found" />
                    <h3>Nothing Found</h3>
                </div>}
            </div>
        </>
    )
}