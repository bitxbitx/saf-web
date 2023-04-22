import { Alert, LinearProgress, Snackbar } from '@mui/material';
import { useHistory } from 'react-router-dom';
import NothingFoundSvg from '../../../../assets/img/NothingFound.svg';
import InfoCard from '../../../../components/InfoCard/InfoCard';
import { useDeleteProductMutation, useGetProductsQuery } from '../../../../feature/services/ecom/product.services';
import styles from './ProductList.module.css';

export default function ProductList() {
    const { data, error, isLoading } = useGetProductsQuery();
    const [deleteProduct] = useDeleteProductMutation();
    const history = useHistory();

    const handleEdit = (id) => {
        history.push(`/admin/products/${id}`);
    }

    const handleDelete = (id) => {
        deleteProduct(id);
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
                {data?.products?.length > 0 ? data?.products?.map((product) => (
                    <InfoCard
                        key={product._id}
                        image={product.image}
                        title={product.name}
                        properties={{ description: product.description }}
                        editFunc={() => handleEdit(product._id)}
                        deleteFunc={() => handleDelete(product._id)}
                    />
                )) : <div className={styles.nothingFound}>
                    <img src={NothingFoundSvg} alt="Nothing Found" />
                    <h3>Nothing Found</h3>
                </div>}
            </div>
        </>
    )
}
