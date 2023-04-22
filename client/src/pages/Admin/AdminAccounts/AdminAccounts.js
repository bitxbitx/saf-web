import React from 'react';
import ContentTopBar from '../../../components/ContentTopBar/ContentTopBar';
// import styles from './AdminAccounts.module.css';
import { Route, Switch } from 'react-router-dom';
import AdminAccountDetails from './AdminAccountDetails/AdminAccountDetails';
import AdminAccountList from './AdminAccountList/AdminAccountList';
import CreateAdminAccount from './CreateAdminAccount/CreateAdminAccount';

export default function AdminAccounts() {
    return (
        <>
            <ContentTopBar title="Admin Accounts" redirectLink="/admin/admin-accounts/create" />
            <Switch>
                <Route path="/admin/admin-accounts/create"> <CreateAdminAccount /> </Route>
                <Route path="/admin/admin-accounts/:id"> <AdminAccountDetails /> </Route>
                <Route path="/admin/admin-accounts" exact> <AdminAccountList /> </Route>
            </Switch>
        </>
    )
}

