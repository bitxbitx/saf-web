import { Alert, LinearProgress, Snackbar } from '@mui/material';
import React from 'react';
import { useHistory } from 'react-router-dom';
import NothingFoundSvg from '../../../../assets/img/NothingFound.svg';
import InfoCard from '../../../../components/InfoCard/InfoCard';
import { useDeleteUserMutation, useGetUsersQuery } from '../../../../feature/services/auth/user.services';
import styles from './CustomerAccountList.module.css';

export default function CustomerAccountList() {
    const { data, error, isLoading } = useGetUsersQuery();
    const [deleteUser] = useDeleteUserMutation();
    const history = useHistory();

    const handleEdit = (id) => {
        history.push(`/admin/customer-accounts/${id}`);
    }

    const handleDelete = (id) => {
        deleteUser(id);
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
            {!isLoading && data?.users?.length > 0 && <div className={styles.container}>
                <div className={styles.row}>
                    {data.users.filter((el)=> {return el.role ==='Customer'}).map((user) => (
                        <InfoCard
                            key={user._id}
                            title={user.name}
                            properties={{ "Email": user.email, "Role": user.role }}
                            image={user.image}
                            imageAlt={user.username}
                            imageHeight={200}
                            editFunc={() => handleEdit(user._id)}
                            deleteFunc={() => handleDelete(user._id)}
                        />
                    ))}
                </div>
            </div>}
            {!isLoading && data?.users?.length === 0 && <div className={styles.container}>
                <div className={styles.row}>
                    <img src={NothingFoundSvg} alt="Nothing Found" />
                </div>
            </div>}

        </>
    )
}