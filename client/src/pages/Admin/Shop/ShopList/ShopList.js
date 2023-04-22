import { Alert, LinearProgress, Snackbar } from '@mui/material';
import InfoCard from '../../../../components/InfoCard/InfoCard';
import { useGetShopLocationsQuery, useDeleteShopLocationMutation } from '../../../../feature/services/ecom/shopLocation.services';
import { useHistory } from 'react-router-dom';
import NothingFoundSvg from '../../../../assets/img/NothingFound.svg';
import styles from './ShopList.module.css';

export default function ShopList() {
    const { data, error, isLoading } = useGetShopLocationsQuery();
    const [deleteShopLocation] = useDeleteShopLocationMutation();
    const history = useHistory();

    const handleEdit = (id) => {
        history.push(`/admin/shop/${id}`);
    }

    const handleDelete = (id) => {
        deleteShopLocation(id);
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
                {data?.shopLocations?.length > 0 ? data?.shopLocations?.map((shopLocation) => (
                    <InfoCard
                        key={shopLocation._id}
                        title={shopLocation.name}
                        properties={{ longitude: shopLocation.longitude, latitude: shopLocation.latitude }}
                        editFunc={() => handleEdit(shopLocation._id)}
                        deleteFunc={() => handleDelete(shopLocation._id)}
                    />
                )) : <div className={styles.nothingFound}>
                    <img src={NothingFoundSvg} alt="Nothing Found" />
                    <h3>Nothing Found</h3>
                </div>}
            </div>
        </>
    )
}